import { useTheme } from "../context/ThemeContext";


const palettes = [
{ name: "Midnight", colors: ["#1e293b", "#3b82f6", "#8b5cf6"] },
{ name: "Ocean", colors: ["#0f172a", "#0ea5e9", "#38bdf8"] },
{ name: "Forest", colors: ["#14532d", "#22c55e", "#4ade80"] },
{ name: "Sunset", colors: ["#7c2d12", "#f97316", "#fb923c"] },
{ name: "CodeKrafters", colors: ["#feefb6","#f9b000", "#0d0d0d"] },
];


export default function Settings() {
const { theme, setTheme } = useTheme();


const applyPalette = (palette) => {
setTheme({
background: palette.colors[0],
primary: palette.colors[1],
secondary: palette.colors[2],
cardBg: theme.cardBg,
});
};


return (
<div className="min-h-screen text-white" style={{ background: "var(--bg)" }}>
<div className="max-w-6xl mx-auto p-6 grid lg:grid-cols-3 gap-6">


{/* LEFT */}
<div className="lg:col-span-2 space-y-6">
<h1 className="text-3xl font-bold">Theme Settings</h1>


<div className="bg-[var(--card)] p-6 rounded-2xl space-y-4">
<h2 className="font-semibold">Color Palettes</h2>


<div className="grid md:grid-cols-2 gap-4">
{palettes.map((p) => (
<button
key={p.name}
onClick={() => applyPalette(p)}
className="border border-white/20 rounded-xl p-4 hover:scale-105 transition"
>
<div className="flex gap-2 mb-2">
{p.colors.map((c) => (
<div key={c} className="w-8 h-8 rounded" style={{ background: c }} />
))}
</div>
<p className="text-sm">{p.name}</p>
</button>
))}
</div>


{/* Custom pickers */}
<ColorInput
label="Background"
value={theme.background}
onChange={(v) => setTheme({ ...theme, background: v })}
/>


<ColorInput
label="Primary"
value={theme.primary}
onChange={(v) => setTheme({ ...theme, primary: v })}
/>
<ColorInput
label="Secondary"
value={theme.secondary}
onChange={(v) => setTheme({ ...theme, secondary: v })}
/>
</div>
</div>


{/* RIGHT */}
<div className="space-y-6">
<div className="bg-[var(--card)] p-6 rounded-2xl space-y-2">
<h2 className="font-semibold">Preview</h2>
<div className="h-12 rounded" style={{ background: "var(--bg)" }} />
<div className="h-12 rounded" style={{ background: "var(--primary)" }} />
<div className="h-12 rounded" style={{ background: "var(--secondary)" }} />
<div className="h-12 rounded" style={{ background: "var(--card)" }} />

</div>


<button
onClick={() => localStorage.removeItem("app-theme")}
className="w-full py-2 bg-red-600 rounded-lg"
>
Reset Theme
</button>
</div>
</div>
</div>
);
}

function ColorInput({ label, value, onChange }) {
return (
<div className="space-y-1">
<p className="text-sm">{label}</p>
<input
type="color"
value={value}
onChange={(e) => onChange(e.target.value)}
className="w-full h-10 rounded"
/>
</div>
);
}

