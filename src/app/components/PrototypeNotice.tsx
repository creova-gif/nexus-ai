export const PROTOTYPE_NOTICE =
  "Prototype – illustrative data, not a real customer or certification";

export default function PrototypeNotice() {
  return (
    <div
      role="note"
      data-testid="prototype-notice"
      className="w-full text-center text-xs font-semibold tracking-wide px-4 py-2"
      style={{
        background: "rgba(251,191,36,0.16)",
        color: "#FBBF24",
        borderBottom: "0.5px solid rgba(251,191,36,0.4)",
        fontFamily: "'Geist', sans-serif",
      }}
    >
      {PROTOTYPE_NOTICE}
    </div>
  );
}
