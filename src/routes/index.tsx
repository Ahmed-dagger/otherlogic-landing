import { createFileRoute } from "@tanstack/react-router";
import { OtherLogicLanding } from "@/components/otherlogic/OtherLogicLanding";

export const Route = createFileRoute("/")({
  component: OtherLogicLanding,
  head: () => ({
    meta: [
      { title: "OtherLogic — F&B Technology & Digital Solutions" },
      {
        name: "description",
        content:
          "OtherLogic is an Egypt-based technology and integrated digital solutions company with 22+ years of experience across web, mobile, software, commerce, marketing, security and automation.",
      },
      { property: "og:title", content: "OtherLogic — F&B Technology & Digital Solutions" },
      {
        property: "og:description",
        content: "22+ years connecting F&B operations through practical technology and integrated digital solutions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
