// Each entry: canonical display name, accepted answer strings (lowercase),
// capital city, and currency name. Currency is intentionally shared across
// many entries (e.g. Euro, CFA Franc) — any valid country for that currency
// counts as correct.

export interface CountryEntry {
	name: string;
	aliases: string[];
	capital: string;
	currency: string;
}

const raw: CountryEntry[] = [
	{
		name: "India",
		aliases: ["india"],
		capital: "New Delhi",
		currency: "Indian Rupee",
	},
	{
		name: "United States",
		aliases: [
			"united states",
			"usa",
			"us",
			"america",
			"united states of america",
		],
		capital: "Washington D.C.",
		currency: "US Dollar",
	},
	{
		name: "United Kingdom",
		aliases: ["united kingdom", "uk", "britain", "great britain"],
		capital: "London",
		currency: "Pound Sterling",
	},
	{ name: "France", aliases: ["france"], capital: "Paris", currency: "Euro" },
	{
		name: "Germany",
		aliases: ["germany"],
		capital: "Berlin",
		currency: "Euro",
	},
	{ name: "Italy", aliases: ["italy"], capital: "Rome", currency: "Euro" },
	{ name: "Spain", aliases: ["spain"], capital: "Madrid", currency: "Euro" },
	{
		name: "Portugal",
		aliases: ["portugal"],
		capital: "Lisbon",
		currency: "Euro",
	},
	{
		name: "Netherlands",
		aliases: ["netherlands", "holland"],
		capital: "Amsterdam",
		currency: "Euro",
	},
	{
		name: "Ireland",
		aliases: ["ireland"],
		capital: "Dublin",
		currency: "Euro",
	},
	{ name: "Greece", aliases: ["greece"], capital: "Athens", currency: "Euro" },
	{
		name: "Belgium",
		aliases: ["belgium"],
		capital: "Brussels",
		currency: "Euro",
	},
	{
		name: "Austria",
		aliases: ["austria"],
		capital: "Vienna",
		currency: "Euro",
	},
	{
		name: "Finland",
		aliases: ["finland"],
		capital: "Helsinki",
		currency: "Euro",
	},
	{
		name: "Japan",
		aliases: ["japan"],
		capital: "Tokyo",
		currency: "Japanese Yen",
	},
	{
		name: "China",
		aliases: ["china"],
		capital: "Beijing",
		currency: "Chinese Yuan",
	},
	{
		name: "South Korea",
		aliases: ["south korea", "korea", "republic of korea"],
		capital: "Seoul",
		currency: "South Korean Won",
	},
	{
		name: "North Korea",
		aliases: ["north korea"],
		capital: "Pyongyang",
		currency: "North Korean Won",
	},
	{
		name: "Russia",
		aliases: ["russia", "russian federation"],
		capital: "Moscow",
		currency: "Russian Ruble",
	},
	{
		name: "Canada",
		aliases: ["canada"],
		capital: "Ottawa",
		currency: "Canadian Dollar",
	},
	{
		name: "Australia",
		aliases: ["australia"],
		capital: "Canberra",
		currency: "Australian Dollar",
	},
	{
		name: "Brazil",
		aliases: ["brazil"],
		capital: "Brasilia",
		currency: "Brazilian Real",
	},
	{
		name: "Argentina",
		aliases: ["argentina"],
		capital: "Buenos Aires",
		currency: "Argentine Peso",
	},
	{
		name: "Mexico",
		aliases: ["mexico"],
		capital: "Mexico City",
		currency: "Mexican Peso",
	},
	{
		name: "Chile",
		aliases: ["chile"],
		capital: "Santiago",
		currency: "Chilean Peso",
	},
	{
		name: "Colombia",
		aliases: ["colombia"],
		capital: "Bogota",
		currency: "Colombian Peso",
	},
	{
		name: "Peru",
		aliases: ["peru"],
		capital: "Lima",
		currency: "Peruvian Sol",
	},
	{
		name: "South Africa",
		aliases: ["south africa"],
		capital: "Pretoria",
		currency: "South African Rand",
	},
	{
		name: "Egypt",
		aliases: ["egypt"],
		capital: "Cairo",
		currency: "Egyptian Pound",
	},
	{
		name: "Nigeria",
		aliases: ["nigeria"],
		capital: "Abuja",
		currency: "Nigerian Naira",
	},
	{
		name: "Kenya",
		aliases: ["kenya"],
		capital: "Nairobi",
		currency: "Kenyan Shilling",
	},
	{
		name: "Ethiopia",
		aliases: ["ethiopia"],
		capital: "Addis Ababa",
		currency: "Ethiopian Birr",
	},
	{
		name: "Ghana",
		aliases: ["ghana"],
		capital: "Accra",
		currency: "Ghanaian Cedi",
	},
	{
		name: "Morocco",
		aliases: ["morocco"],
		capital: "Rabat",
		currency: "Moroccan Dirham",
	},
	{
		name: "Senegal",
		aliases: ["senegal"],
		capital: "Dakar",
		currency: "West African CFA Franc",
	},
	{
		name: "Ivory Coast",
		aliases: ["ivory coast", "cote d'ivoire", "cote divoire"],
		capital: "Yamoussoukro",
		currency: "West African CFA Franc",
	},
	{
		name: "Cameroon",
		aliases: ["cameroon"],
		capital: "Yaounde",
		currency: "Central African CFA Franc",
	},
	{
		name: "Gabon",
		aliases: ["gabon"],
		capital: "Libreville",
		currency: "Central African CFA Franc",
	},
	{
		name: "Saudi Arabia",
		aliases: ["saudi arabia"],
		capital: "Riyadh",
		currency: "Saudi Riyal",
	},
	{
		name: "United Arab Emirates",
		aliases: ["united arab emirates", "uae"],
		capital: "Abu Dhabi",
		currency: "UAE Dirham",
	},
	{
		name: "Turkey",
		aliases: ["turkey", "turkiye"],
		capital: "Ankara",
		currency: "Turkish Lira",
	},
	{
		name: "Israel",
		aliases: ["israel"],
		capital: "Jerusalem",
		currency: "Israeli Shekel",
	},
	{
		name: "Iran",
		aliases: ["iran"],
		capital: "Tehran",
		currency: "Iranian Rial",
	},
	{
		name: "Iraq",
		aliases: ["iraq"],
		capital: "Baghdad",
		currency: "Iraqi Dinar",
	},
	{
		name: "Pakistan",
		aliases: ["pakistan"],
		capital: "Islamabad",
		currency: "Pakistani Rupee",
	},
	{
		name: "Bangladesh",
		aliases: ["bangladesh"],
		capital: "Dhaka",
		currency: "Bangladeshi Taka",
	},
	{
		name: "Sri Lanka",
		aliases: ["sri lanka"],
		capital: "Colombo",
		currency: "Sri Lankan Rupee",
	},
	{
		name: "Nepal",
		aliases: ["nepal"],
		capital: "Kathmandu",
		currency: "Nepalese Rupee",
	},
	{
		name: "Bhutan",
		aliases: ["bhutan"],
		capital: "Thimphu",
		currency: "Bhutanese Ngultrum",
	},
	{
		name: "Thailand",
		aliases: ["thailand"],
		capital: "Bangkok",
		currency: "Thai Baht",
	},
	{
		name: "Vietnam",
		aliases: ["vietnam"],
		capital: "Hanoi",
		currency: "Vietnamese Dong",
	},
	{
		name: "Indonesia",
		aliases: ["indonesia"],
		capital: "Jakarta",
		currency: "Indonesian Rupiah",
	},
	{
		name: "Malaysia",
		aliases: ["malaysia"],
		capital: "Kuala Lumpur",
		currency: "Malaysian Ringgit",
	},
	{
		name: "Singapore",
		aliases: ["singapore"],
		capital: "Singapore",
		currency: "Singapore Dollar",
	},
	{
		name: "Philippines",
		aliases: ["philippines"],
		capital: "Manila",
		currency: "Philippine Peso",
	},
	{
		name: "Myanmar",
		aliases: ["myanmar", "burma"],
		capital: "Naypyidaw",
		currency: "Myanmar Kyat",
	},
	{
		name: "Cambodia",
		aliases: ["cambodia"],
		capital: "Phnom Penh",
		currency: "Cambodian Riel",
	},
	{
		name: "Laos",
		aliases: ["laos"],
		capital: "Vientiane",
		currency: "Lao Kip",
	},
	{
		name: "Mongolia",
		aliases: ["mongolia"],
		capital: "Ulaanbaatar",
		currency: "Mongolian Tugrik",
	},
	{
		name: "Kazakhstan",
		aliases: ["kazakhstan"],
		capital: "Astana",
		currency: "Kazakhstani Tenge",
	},
	{
		name: "Afghanistan",
		aliases: ["afghanistan"],
		capital: "Kabul",
		currency: "Afghan Afghani",
	},
	{
		name: "Poland",
		aliases: ["poland"],
		capital: "Warsaw",
		currency: "Polish Zloty",
	},
	{
		name: "Sweden",
		aliases: ["sweden"],
		capital: "Stockholm",
		currency: "Swedish Krona",
	},
	{
		name: "Norway",
		aliases: ["norway"],
		capital: "Oslo",
		currency: "Norwegian Krone",
	},
	{
		name: "Denmark",
		aliases: ["denmark"],
		capital: "Copenhagen",
		currency: "Danish Krone",
	},
	{
		name: "Switzerland",
		aliases: ["switzerland"],
		capital: "Bern",
		currency: "Swiss Franc",
	},
	{
		name: "Iceland",
		aliases: ["iceland"],
		capital: "Reykjavik",
		currency: "Icelandic Krona",
	},
	{
		name: "Ukraine",
		aliases: ["ukraine"],
		capital: "Kyiv",
		currency: "Ukrainian Hryvnia",
	},
	{
		name: "Czech Republic",
		aliases: ["czech republic", "czechia"],
		capital: "Prague",
		currency: "Czech Koruna",
	},
	{
		name: "Hungary",
		aliases: ["hungary"],
		capital: "Budapest",
		currency: "Hungarian Forint",
	},
	{
		name: "Romania",
		aliases: ["romania"],
		capital: "Bucharest",
		currency: "Romanian Leu",
	},
	{
		name: "Croatia",
		aliases: ["croatia"],
		capital: "Zagreb",
		currency: "Euro",
	},
	{
		name: "Serbia",
		aliases: ["serbia"],
		capital: "Belgrade",
		currency: "Serbian Dinar",
	},
	{
		name: "New Zealand",
		aliases: ["new zealand"],
		capital: "Wellington",
		currency: "New Zealand Dollar",
	},
	{
		name: "Fiji",
		aliases: ["fiji"],
		capital: "Suva",
		currency: "Fijian Dollar",
	},
	{
		name: "Jamaica",
		aliases: ["jamaica"],
		capital: "Kingston",
		currency: "Jamaican Dollar",
	},
	{
		name: "Cuba",
		aliases: ["cuba"],
		capital: "Havana",
		currency: "Cuban Peso",
	},
	{
		name: "Venezuela",
		aliases: ["venezuela"],
		capital: "Caracas",
		currency: "Venezuelan Bolivar",
	},
	{
		name: "Bolivia",
		aliases: ["bolivia"],
		capital: "Sucre",
		currency: "Bolivian Boliviano",
	},
	{
		name: "Ecuador",
		aliases: ["ecuador"],
		capital: "Quito",
		currency: "US Dollar",
	},
	{
		name: "Uruguay",
		aliases: ["uruguay"],
		capital: "Montevideo",
		currency: "Uruguayan Peso",
	},
	{
		name: "Paraguay",
		aliases: ["paraguay"],
		capital: "Asuncion",
		currency: "Paraguayan Guarani",
	},
	{
		name: "Panama",
		aliases: ["panama"],
		capital: "Panama City",
		currency: "Panamanian Balboa",
	},
	{
		name: "Costa Rica",
		aliases: ["costa rica"],
		capital: "San Jose",
		currency: "Costa Rican Colon",
	},
	{
		name: "Kuwait",
		aliases: ["kuwait"],
		capital: "Kuwait City",
		currency: "Kuwaiti Dinar",
	},
	{
		name: "Qatar",
		aliases: ["qatar"],
		capital: "Doha",
		currency: "Qatari Riyal",
	},
	{
		name: "Jordan",
		aliases: ["jordan"],
		capital: "Amman",
		currency: "Jordanian Dinar",
	},
	{
		name: "Lebanon",
		aliases: ["lebanon"],
		capital: "Beirut",
		currency: "Lebanese Pound",
	},
	{
		name: "Algeria",
		aliases: ["algeria"],
		capital: "Algiers",
		currency: "Algerian Dinar",
	},
	{
		name: "Tunisia",
		aliases: ["tunisia"],
		capital: "Tunis",
		currency: "Tunisian Dinar",
	},
	{
		name: "Libya",
		aliases: ["libya"],
		capital: "Tripoli",
		currency: "Libyan Dinar",
	},
	{
		name: "Tanzania",
		aliases: ["tanzania"],
		capital: "Dodoma",
		currency: "Tanzanian Shilling",
	},
	{
		name: "Uganda",
		aliases: ["uganda"],
		capital: "Kampala",
		currency: "Ugandan Shilling",
	},
	{
		name: "Zimbabwe",
		aliases: ["zimbabwe"],
		capital: "Harare",
		currency: "US Dollar",
	},
	{
		name: "Zambia",
		aliases: ["zambia"],
		capital: "Lusaka",
		currency: "Zambian Kwacha",
	},
	{
		name: "Mozambique",
		aliases: ["mozambique"],
		capital: "Maputo",
		currency: "Mozambican Metical",
	},
	{
		name: "Madagascar",
		aliases: ["madagascar"],
		capital: "Antananarivo",
		currency: "Malagasy Ariary",
	},
	{
		name: "Angola",
		aliases: ["angola"],
		capital: "Luanda",
		currency: "Angolan Kwanza",
	},
	{
		name: "Botswana",
		aliases: ["botswana"],
		capital: "Gaborone",
		currency: "Botswana Pula",
	},
	{
		name: "Namibia",
		aliases: ["namibia"],
		capital: "Windhoek",
		currency: "Namibian Dollar",
	},
];

export const countries: CountryEntry[] = raw;

export type Mode = "capital" | "currency";

export function randomCountry(exclude?: string): CountryEntry {
	let pick = countries[Math.floor(Math.random() * countries.length)];
	if (exclude) {
		while (pick.name === exclude) {
			pick = countries[Math.floor(Math.random() * countries.length)];
		}
	}
	return pick;
}

function normalize(s: string): string {
	return s
		.trim()
		.toLowerCase()
		.replace(/[^a-z\s]/g, "")
		.replace(/\s+/g, " ");
}

// simple levenshtein distance for typo tolerance
function levenshtein(a: string, b: string): number {
	const dp: number[][] = Array.from({ length: a.length + 1 }, () =>
		new Array(b.length + 1).fill(0),
	);
	for (let i = 0; i <= a.length; i++) dp[i][0] = i;
	for (let j = 0; j <= b.length; j++) dp[0][j] = j;
	for (let i = 1; i <= a.length; i++) {
		for (let j = 1; j <= b.length; j++) {
			if (a[i - 1] === b[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
			}
		}
	}
	return dp[a.length][b.length];
}

// Checks a typed guess against the target entry, and also against any other
// entry that shares the same capital/currency value (for shared-currency cases).
export function checkGuess(
	guess: string,
	target: CountryEntry,
	mode: Mode,
): boolean {
	const g = normalize(guess);
	if (!g) return false;

	const key = mode === "capital" ? target.capital : target.currency;
	const validEntries = countries.filter((c) =>
		mode === "capital" ? c.capital === key : c.currency === key,
	);

	for (const entry of validEntries) {
		for (const alias of entry.aliases) {
			const a = normalize(alias);
			if (a === g) return true;
			// typo tolerance: allow small edit distance relative to length
			const maxDist = a.length <= 4 ? 0 : a.length <= 7 ? 1 : 2;
			if (levenshtein(a, g) <= maxDist) return true;
		}
	}
	return false;
}
