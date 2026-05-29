import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <div className="relative flex min-h-[70vh] items-center overflow-hidden bg-dawn-strong noise-overlay">
      <Container className="relative z-10 flex flex-col items-center gap-6 py-24 text-center">
        <span className="font-display text-7xl text-gradient-sky">404</span>
        <h1 className="font-display text-3xl text-sky-900">{t("title")}</h1>
        <p className="max-w-md text-mist-600">{t("body")}</p>
        <Button href="/" variant="primary" size="lg">
          {t("home")}
        </Button>
      </Container>
    </div>
  );
}
