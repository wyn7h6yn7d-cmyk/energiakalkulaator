import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** WattWise favicon: roheline taust + valge W (clean-tech). */
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
          background: "linear-gradient(145deg, #10b981 0%, #0ea5a4 100%)",
          borderRadius: 8,
          boxShadow:
            "inset 0 0 0 1px rgba(255,255,255,0.22), 0 0 18px rgba(16,185,129,0.25)",
        }}
      >
        <span
          style={{
            color: "#ffffff",
            fontSize: 20,
            fontWeight: 800,
            fontFamily:
              "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif",
            lineHeight: 1,
            marginTop: -1,
          }}
        >
          E
        </span>
      </div>
    ),
    { ...size },
  );
}
