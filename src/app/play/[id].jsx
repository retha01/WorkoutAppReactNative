import { useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as Speech from "expo-speech";
import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useKeepAwake } from "expo-keep-awake";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { bodyParts } from "../../constants";
import { getExercise, getPlan } from "../../constants/exercises";

const REST = 10; // seconds between exercises
const WORK_OPTIONS = [null, 30, 45, 60]; // null = each exercise's own time

const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

export default function Play() {
  useKeepAwake();
  const router = useRouter();
  const { id, name, part: partId, mode = "equipment" } = useLocalSearchParams();
  const bell = useAudioPlayer(require("../../../assets/sounds/bell.wav"));

  // A body-part workout (several exercises) or a single exercise
  const list = partId ? getPlan(partId, mode) : [getExercise(id, name)];
  const part = bodyParts.find((p) => p.id === partId);
  const title = part ? `${part.name} workout` : list[0].name;

  // phase: ready | countdown | work | rest | done
  const [phase, setPhase] = useState("ready");
  const [paused, setPaused] = useState(false);
  const [idx, setIdx] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [count, setCount] = useState(3);
  const [workOverride, setWorkOverride] = useState(null);

  const timers = useRef([]);
  const secondsFor = (e) => workOverride ?? e.seconds;

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true }).catch(() => {});
    return () => {
      timers.current.forEach(clearTimeout);
      Speech.stop();
    };
  }, []);

  const ring = () => {
    try {
      bell.seekTo(0);
      bell.play();
    } catch (e) {}
  };

  const say = (text, delay = 0) => {
    const t = setTimeout(() => Speech.speak(text, { rate: 0.95 }), delay);
    timers.current.push(t);
  };

  // 3-2-1, then bell + "Start workout"
  useEffect(() => {
    if (phase !== "countdown") return;
    if (count === 0) {
      setIdx(0);
      setRemaining(secondsFor(list[0]));
      setPhase("work");
      ring();
      say(
        list.length > 1
          ? `Start workout. First exercise is ${list[0].name}`
          : `Start workout. ${list[0].name}`,
        700
      );
      return;
    }
    const t = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, count]);

  // move on when a work or rest period ends
  const advance = () => {
    if (phase === "work") {
      if (idx >= list.length - 1) {
        setPhase("done");
        ring();
        say("Workout complete. Great job!", 700);
      } else {
        setPhase("rest");
        setRemaining(REST);
        say(`Next exercise is ${list[idx + 1].name}`);
      }
    } else if (phase === "rest") {
      setIdx(idx + 1);
      setPhase("work");
      setRemaining(secondsFor(list[idx + 1]));
    }
  };

  // the one-second tick
  useEffect(() => {
    if ((phase !== "work" && phase !== "rest") || paused) return;
    if (remaining <= 0) {
      advance();
      return;
    }
    const t = setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => clearTimeout(t);
  }, [phase, remaining, paused]);

  const begin = () => {
    setPaused(false);
    setCount(3);
    setPhase("countdown");
    say("Get ready");
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    Speech.stop();
    setPaused(false);
    setIdx(0);
    setPhase("ready");
  };

  const skip = () => {
    Speech.stop();
    advance();
  };

  if (list.length === 0) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-neutral-700">No exercises here yet.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-pink-500">Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const current = list[Math.min(idx, list.length - 1)];
  const next = list[idx + 1];
  const showing = phase === "rest" && next ? next : current;

  const phaseTotal =
    phase === "rest" ? REST : phase === "work" ? secondsFor(current) : 0;
  const progress =
    phase === "done"
      ? 100
      : phaseTotal
      ? ((phaseTotal - remaining) / phaseTotal) * 100
      : 0;

  const bigText =
    phase === "countdown"
      ? count > 0
        ? String(count)
        : "GO"
      : phase === "ready"
      ? fmt(secondsFor(list[0]))
      : phase === "done"
      ? "0:00"
      : fmt(remaining);

  const label =
    phase === "ready"
      ? list.length > 1
        ? `${list.length} EXERCISES`
        : "READY"
      : phase === "countdown"
      ? "GET READY"
      : phase === "rest"
      ? `REST · NEXT: ${next ? next.name.toUpperCase() : ""}`
      : phase === "done"
      ? "WORKOUT COMPLETE"
      : `EXERCISE ${idx + 1} OF ${list.length}`;

  const running = phase === "work" || phase === "rest";

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(6) }}
      >
        {/* header */}
        <View className="flex-row items-center mx-5 mb-4">
          <TouchableOpacity onPress={() => router.back()} hitSlop={12} className="mr-3">
            <Text style={{ fontSize: hp(4), color: "#404040" }}>‹</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: hp(3) }} className="flex-1 font-bold text-neutral-700">
            {title}
          </Text>
        </View>

        {/* timer card */}
        <View
          style={{
            marginHorizontal: 20,
            backgroundColor: "#fdf2f8",
            borderRadius: 24,
            paddingVertical: 24,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: hp(1.7),
              fontWeight: "700",
              letterSpacing: 1,
              color: "#be185d",
              textAlign: "center",
            }}
          >
            {label}
          </Text>

          <Text
            style={{ fontSize: hp(3.2), fontWeight: "700", textAlign: "center", marginTop: 8 }}
            className="text-neutral-700"
          >
            {phase === "done" ? "Great job!" : phase === "rest" ? "Rest" : current.name}
          </Text>
          {phase !== "done" && phase !== "rest" && current.muscles.length > 0 && (
            <Text style={{ fontSize: hp(1.7) }} className="text-neutral-500">
              {current.muscles.join(" · ")}
            </Text>
          )}

          <Text
            style={{
              fontSize: hp(10),
              fontWeight: "800",
              marginTop: 12,
              color: phase === "rest" ? "#16a34a" : "#404040",
              fontVariant: ["tabular-nums"],
            }}
          >
            {bigText}
          </Text>

          <View
            style={{
              width: "100%",
              height: 8,
              borderRadius: 999,
              backgroundColor: "#fff",
              marginTop: 8,
              overflow: "hidden",
            }}
          >
            <View
              style={{ width: `${progress}%`, height: "100%", backgroundColor: "#ec4899" }}
            />
          </View>

          {paused && (
            <Text style={{ fontSize: hp(2) }} className="mt-3 text-neutral-500">
              Paused
            </Text>
          )}
        </View>

        {/* work time chips */}
        {phase === "ready" && (
          <View className="mt-5 items-center">
            <Text style={{ fontSize: hp(1.6) }} className="mb-2 text-neutral-500">
              Time per exercise
            </Text>
            <View className="flex-row">
              {WORK_OPTIONS.map((s) => {
                const active = workOverride === s;
                return (
                  <TouchableOpacity
                    key={String(s)}
                    onPress={() => setWorkOverride(s)}
                    style={{
                      backgroundColor: active ? "#ec4899" : "#f5f5f5",
                      paddingVertical: 8,
                      paddingHorizontal: 16,
                      borderRadius: 999,
                      marginHorizontal: 5,
                    }}
                  >
                    <Text
                      style={{
                        color: active ? "#fff" : "#525252",
                        fontWeight: "600",
                        fontSize: hp(1.8),
                      }}
                    >
                      {s === null ? "Auto" : `${s}s`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* controls */}
        <View className="mx-5 mt-6">
          {phase === "ready" && <Btn title="START WORKOUT" onPress={begin} />}
          {phase === "countdown" && <Btn title="CANCEL" onPress={reset} secondary />}
          {running && (
            <>
              <Btn
                title={paused ? "RESUME" : "PAUSE"}
                onPress={() => {
                  if (paused) setPaused(false);
                  else {
                    Speech.stop();
                    setPaused(true);
                  }
                }}
              />
              <View className="flex-row">
                <View className="flex-1 mr-2">
                  <Btn title="SKIP" onPress={skip} secondary />
                </View>
                <View className="flex-1 ml-2">
                  <Btn title="STOP" onPress={reset} secondary />
                </View>
              </View>
            </>
          )}
          {phase === "done" && (
            <>
              <Btn title="DO IT AGAIN" onPress={reset} />
              <Btn title="BACK" onPress={() => router.back()} secondary />
            </>
          )}
        </View>

        {/* steps for the current (or next, during rest) exercise */}
        {phase !== "done" && (
          <View className="mx-5 mt-8">
            <Text style={{ fontSize: hp(2.4) }} className="mb-3 font-semibold text-neutral-700">
              {phase === "rest" ? `Get ready: ${showing.name}` : "How to do it"}
            </Text>
            {(phase === "ready" ? list[0] : showing).steps.map((step, i) => (
              <View key={i} className="flex-row mb-3">
                <View
                  style={{
                    width: hp(3.4),
                    height: hp(3.4),
                    borderRadius: 999,
                    backgroundColor: "#ec4899",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 12,
                  }}
                >
                  <Text style={{ color: "#fff", fontSize: hp(1.7), fontWeight: "700" }}>
                    {i + 1}
                  </Text>
                </View>
                <Text
                  style={{ fontSize: hp(1.9), lineHeight: hp(2.8) }}
                  className="flex-1 text-neutral-600"
                >
                  {step}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* plan overview */}
        {list.length > 1 && (
          <View className="mx-5 mt-4">
            <Text style={{ fontSize: hp(2.4) }} className="mb-3 font-semibold text-neutral-700">
              Workout plan
            </Text>
            {list.map((e, i) => {
              const isCurrent = running && i === idx && phase === "work";
              const isDone = phase === "done" || (running && i < idx);
              return (
                <View
                  key={e.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: isCurrent ? "#fce7f3" : "#f5f5f5",
                    padding: 12,
                    borderRadius: 14,
                    marginBottom: 8,
                    opacity: isDone ? 0.5 : 1,
                  }}
                >
                  <Text
                    style={{ width: 28, fontWeight: "700", color: "#ec4899", fontSize: hp(1.9) }}
                  >
                    {isDone ? "✓" : i + 1}
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.9), fontWeight: "600" }}
                    className="flex-1 text-neutral-700"
                  >
                    {e.name}
                  </Text>
                  <Text style={{ fontSize: hp(1.6) }} className="text-neutral-500">
                    {secondsFor(e)}s
                  </Text>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const Btn = ({ title, onPress, secondary }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    style={{
      backgroundColor: secondary ? "#fff" : "#ec4899",
      borderWidth: secondary ? 1 : 0,
      borderColor: "#d4d4d4",
      paddingVertical: 16,
      borderRadius: 16,
      alignItems: "center",
      marginBottom: 10,
    }}
  >
    <Text
      style={{
        color: secondary ? "#404040" : "#fff",
        fontSize: hp(2),
        fontWeight: "700",
        letterSpacing: 1,
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);