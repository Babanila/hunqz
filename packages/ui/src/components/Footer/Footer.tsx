type FooterProps = {
  companyName: string;
};

export function Footer({
  companyName,
}: FooterProps) {
  return (
    <footer className="border-t bg-black text-[#00bdff]">
      <div className="mx-auto max-w-7xl px-6 py-6">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} {companyName}
        </p>
      </div>
    </footer>
  );
}
