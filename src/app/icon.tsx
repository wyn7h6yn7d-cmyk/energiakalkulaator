import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** WattWise braändi favicon — genereeritud PNG, töötab kõikjal ühtlaselt. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(145deg, #0a1628 0%, #060a12 100%)",
          borderRadius: 8,
          boxShadow: "inset 0 0 0 1px rgba(0, 229, 255, 0.35)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 22,
            height: 22,
            borderRadius: 6,
            background: "linear-gradient(135deg, #00d4ff, #587eff)",
            color: "#02131b",
            fontSize: 14,
            fontWeight: 700,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
          }}
        >
          W
        </div>
      </div>
    ),
    { ...size },
  );
}
