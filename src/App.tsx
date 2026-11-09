import { useEffect, useRef, useState } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type CountryEntry,
	checkGuess,
	countries,
	type Mode,
	randomCountry,
} from "./lib/countries";
import "@fontsource-variable/fraunces";
import "@fontsource/ibm-plex-mono";

type Phase = "guessing" | "correct" | "wrong";

interface ModeStats {
	streak: number;
	best: number;
}

function initialStats(): ModeStats {
	return { streak: 0, best: 0 };
}

const countryOptions = [...countries].sort((a, b) =>
	a.name.localeCompare(b.name),
);

export default function App() {
	const [mode, setMode] = useState<Mode>("capital");
	const [current, setCurrent] = useState<CountryEntry>(() => randomCountry());
	const [phase, setPhase] = useState<Phase>("guessing");
	const [selectedCountry, setSelectedCountry] = useState("");
	const [hintUsed, setHintUsed] = useState(false);
	const [rounds, setRounds] = useState(0);
	const [stats, setStats] = useState<Record<Mode, ModeStats>>({
		capital: initialStats(),
		currency: initialStats(),
	});

	const triggerRef = useRef<HTMLButtonElement>(null);
	const guessButtonRef = useRef<HTMLButtonElement>(null);
	const justSelectedRef = useRef(false);
	const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		triggerRef.current?.focus();
		return () => {
			if (advanceTimer.current) clearTimeout(advanceTimer.current);
		};
	}, []);

	function nextRound() {
		if (advanceTimer.current) clearTimeout(advanceTimer.current);
		setCurrent((prev) => randomCountry(prev.name));
		setPhase("guessing");
		setSelectedCountry("");
		justSelectedRef.current = false;
		setHintUsed(false);
		setRounds((r) => r + 1);
		requestAnimationFrame(() => triggerRef.current?.focus());
	}

	function switchMode(next: Mode) {
		if (next === mode) return;
		setMode(next);
		if (advanceTimer.current) clearTimeout(advanceTimer.current);
		setCurrent(randomCountry());
		setPhase("guessing");
		setSelectedCountry("");
		justSelectedRef.current = false;
		setHintUsed(false);
		requestAnimationFrame(() => triggerRef.current?.focus());
	}

	function handleValueChange(
		value: string | null,
		eventDetails: { reason: string },
	) {
		if (value === null) return;
		if (eventDetails.reason === "item-press") {
			justSelectedRef.current = true;
		}
		setSelectedCountry(value);
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (phase !== "guessing") {
			nextRound();
			return;
		}
		if (!selectedCountry) return;

		const correct = checkGuess(selectedCountry, current, mode);
		if (correct) {
			setPhase("correct");
			setStats((s) => {
				const streak = s[mode].streak + 1;
				return {
					...s,
					[mode]: { streak, best: Math.max(streak, s[mode].best) },
				};
			});
			advanceTimer.current = setTimeout(() => nextRound(), 850);
		} else {
			setPhase("wrong");
			setStats((s) => ({ ...s, [mode]: { ...s[mode], streak: 0 } }));
		}
	}

	function handleSkip() {
		setStats((s) => ({ ...s, [mode]: { ...s[mode], streak: 0 } }));
		nextRound();
	}

	function handleHint() {
		setHintUsed(true);
	}

	const prompt = mode === "capital" ? current.capital : current.currency;
	const promptLabel = mode === "capital" ? "The capital is" : "The currency is";
	const activeStats = stats[mode];

	return (
		<div className="min-h-screen w-full flex justify-center px-6 py-12 sm:py-16">
			<div className="w-full max-w-140">
				<div
					className="flex items-start justify-between gap-6 pb-6 border-b"
					style={{ borderColor: "var(--line)" }}
				>
					<div>
						<h1
							className="font-display text-[28px] sm:text-[32px] leading-none"
							style={{ color: "var(--parchment)" }}
						>
							Country Guess
						</h1>
						<p
							className="font-mono-label text-[12px] mt-2"
							style={{ color: "var(--parchment-dim)" }}
						>
							Round {rounds + 1} &middot; endless
						</p>
					</div>
					<div className="text-right shrink-0">
						<div
							className="font-display text-[32px] leading-none"
							style={{ color: "var(--brass-bright)" }}
						>
							{activeStats.streak}
						</div>
						<p
							className="font-mono-label text-[11px] mt-1"
							style={{ color: "var(--parchment-dim)" }}
						>
							streak &middot; best {activeStats.best}
						</p>
					</div>
				</div>

				<div className="flex mt-7 gap-8">
					{(["capital", "currency"] as Mode[]).map((m) => (
						<button
							key={m}
							type="button"
							onClick={() => switchMode(m)}
							className="font-mono-label text-[13px] pb-2 transition-colors"
							style={{
								color:
									mode === m ? "var(--brass-bright)" : "var(--parchment-dim)",
								borderBottom:
									mode === m
										? "2px solid var(--brass-bright)"
										: "2px solid transparent",
							}}
						>
							{m === "capital" ? "Capital" : "Currency"}
						</button>
					))}
				</div>

				<div className="mt-8 pt-2">
					<p
						className="font-mono-label text-[13px]"
						style={{ color: "var(--parchment-dim)" }}
					>
						{promptLabel}
					</p>
					<p
						className="font-display italic text-[40px] sm:text-[46px] leading-tight mt-1"
						style={{ color: "var(--parchment)" }}
					>
						{prompt}
					</p>

					<form onSubmit={handleSubmit} className="mt-7">
						<div className="flex items-end gap-4">
							<Select
								value={selectedCountry}
								onValueChange={handleValueChange}
								disabled={phase !== "guessing"}
							>
								<SelectTrigger
									ref={triggerRef}
									type="button"
									aria-label="Country"
									className="flex-1 w-full cursor-pointer rounded-none border-0 border-b bg-transparent px-0 py-0 pb-3 font-display text-[22px] shadow-none data-[size=default]:h-auto"
									style={{
										color: "var(--parchment)",
										borderColor:
											phase === "correct"
												? "var(--teal)"
												: phase === "wrong"
													? "var(--rust)"
													: "var(--line)",
									}}
								>
									<SelectValue
										placeholder="Select a country"
										className="data-placeholder:text-[color:var(--parchment-dim)]"
									/>
								</SelectTrigger>
								<SelectContent
									alignItemWithTrigger={false}
									className="max-h-[min(20rem,var(--available-height))]"
									finalFocus={() => {
										if (justSelectedRef.current) {
											justSelectedRef.current = false;
											return guessButtonRef.current;
										}
										return true;
									}}
								>
									{countryOptions.map((country) => (
										<SelectItem key={country.name} value={country.name}>
											{country.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<button
								ref={guessButtonRef}
								type="submit"
								disabled={phase !== "guessing" || !selectedCountry}
								className="font-mono-label text-[13px] pb-3 disabled:opacity-30 btn-physics"
								style={{ color: "var(--brass-bright)" }}
							>
								Guess
							</button>
						</div>
					</form>

					<div className="mt-4 min-h-7 flex items-center justify-between">
						<div className="font-mono-label text-[13px]">
							{phase === "correct" && (
								<span style={{ color: "var(--teal)" }}>
									Correct &mdash; {current.name}
								</span>
							)}
							{phase === "wrong" && (
								<span style={{ color: "var(--rust)" }}>
									Not quite &mdash; it was {current.name}. Press Enter to
									continue.
								</span>
							)}
							{phase === "guessing" && hintUsed && (
								<span style={{ color: "var(--parchment-dim)" }}>
									Starts with &ldquo;{current.name[0]}&rdquo;,{" "}
									{current.name.replace(/[^a-zA-Z]/g, "").length} letters
								</span>
							)}
						</div>
					</div>

					<div className="mt-6 flex items-center gap-6">
						<button
							type="button"
							onClick={handleSkip}
							disabled={phase !== "guessing"}
							className="font-mono-label text-[13px] disabled:opacity-30"
							style={{ color: "var(--parchment-dim)" }}
						>
							Skip
						</button>
						<button
							type="button"
							onClick={handleHint}
							disabled={phase !== "guessing" || hintUsed}
							className="font-mono-label text-[13px] disabled:opacity-30"
							style={{ color: "var(--parchment-dim)" }}
						>
							Hint
						</button>
						{phase !== "guessing" && (
							<button
								type="button"
								onClick={() => nextRound()}
								className="font-mono-label text-[13px] ml-auto"
								style={{ color: "var(--brass-bright)" }}
							>
								Next round
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
