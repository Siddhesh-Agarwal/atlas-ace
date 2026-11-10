import { useEffect, useRef, useState } from "react";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";
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

const countryOptions = [...countries]
	.sort((a, b) => a.name.localeCompare(b.name))
	.map((country) => country.name);

const countryByName = new Map(
	countries.map((country) => [country.name, country] as const),
);

function filterCountry(name: string, query: string): boolean {
	const q = query.trim().toLowerCase();
	if (!q) return true;
	const country = countryByName.get(name);
	if (!country) return false;
	return [country.name, ...country.aliases].some((alias) =>
		alias.toLowerCase().includes(q),
	);
}

export default function App() {
	const [mode, setMode] = useState<Mode>("capital");
	const [current, setCurrent] = useState<CountryEntry>(() => randomCountry());
	const [phase, setPhase] = useState<Phase>("guessing");
	const [selectedCountry, setSelectedCountry] = useState("");
	const [countryQuery, setCountryQuery] = useState("");
	const [hintUsed, setHintUsed] = useState(false);
	const [rounds, setRounds] = useState(0);
	const [stats, setStats] = useState<Record<Mode, ModeStats>>({
		capital: initialStats(),
		currency: initialStats(),
	});

	const inputRef = useRef<HTMLInputElement>(null);
	const guessButtonRef = useRef<HTMLButtonElement>(null);
	const nextRoundButtonRef = useRef<HTMLButtonElement>(null);
	const justSelectedRef = useRef(false);
	const selectedCountryRef = useRef("");
	const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		inputRef.current?.focus();
		return () => {
			if (advanceTimer.current) clearTimeout(advanceTimer.current);
		};
	}, []);

	useEffect(() => {
		if (phase === "wrong") {
			nextRoundButtonRef.current?.focus();
		}
	}, [phase]);

	function nextRound() {
		if (advanceTimer.current) clearTimeout(advanceTimer.current);
		setCurrent((prev) => randomCountry(prev.name));
		setPhase("guessing");
		setSelectedCountry("");
		selectedCountryRef.current = "";
		setCountryQuery("");
		justSelectedRef.current = false;
		setHintUsed(false);
		setRounds((r) => r + 1);
		requestAnimationFrame(() => inputRef.current?.focus());
	}

	function switchMode(next: Mode) {
		if (next === mode) return;
		setMode(next);
		if (advanceTimer.current) clearTimeout(advanceTimer.current);
		setCurrent(randomCountry());
		setPhase("guessing");
		setSelectedCountry("");
		selectedCountryRef.current = "";
		setCountryQuery("");
		justSelectedRef.current = false;
		setHintUsed(false);
		requestAnimationFrame(() => inputRef.current?.focus());
	}

	function handleValueChange(
		value: string | null,
		eventDetails: { reason: string },
	) {
		const next = value ?? "";
		selectedCountryRef.current = next;
		setSelectedCountry(next);
		setCountryQuery(next);
		justSelectedRef.current =
			next !== "" && eventDetails.reason === "item-press";
	}

	function handleInputValueChange(value: string) {
		setCountryQuery(value);
		if (value !== selectedCountryRef.current) {
			selectedCountryRef.current = "";
			setSelectedCountry("");
			justSelectedRef.current = false;
		}
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
						<div className="flex items-baseline gap-4">
							<Combobox
								items={countryOptions}
								value={selectedCountry || null}
								onValueChange={handleValueChange}
								inputValue={countryQuery}
								onInputValueChange={handleInputValueChange}
								filter={filterCountry}
								autoHighlight
								disabled={phase !== "guessing"}
							>
								<ComboboxInput
									ref={inputRef}
									aria-label="Country"
									placeholder="Type or select a country"
									autoComplete="off"
									autoCorrect="off"
									spellCheck={false}
									disabled={phase !== "guessing"}
									triggerLabel="Show country options"
									className={cn(
										"h-auto w-full flex-1 rounded-none border-0 border-b bg-transparent shadow-none",
										phase === "correct"
											? "border-[color:var(--teal)]"
											: phase === "wrong"
												? "border-[color:var(--rust)]"
												: "border-[color:var(--line)]",
									)}
									inputClassName="h-auto px-3 py-2 font-display text-[22px] leading-tight md:text-[22px] md:leading-tight"
								/>
								<ComboboxContent
									finalFocus={() => {
										if (justSelectedRef.current) {
											justSelectedRef.current = false;
											return guessButtonRef.current;
										}
										return true;
									}}
								>
									<ComboboxEmpty>No countries found.</ComboboxEmpty>
									<ComboboxList>
										{(item: string) => (
											<ComboboxItem key={item} value={item} className="pl-2">
												{item}
											</ComboboxItem>
										)}
									</ComboboxList>
								</ComboboxContent>
							</Combobox>
							<button
								ref={guessButtonRef}
								type="submit"
								disabled={phase !== "guessing" || !selectedCountry}
								className="font-mono-label text-[13px] pb-2 disabled:opacity-30 btn-physics"
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
								ref={nextRoundButtonRef}
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
