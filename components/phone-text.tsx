export default function PhoneText({ children }: { children: string }) {
  return children.split(/(\+44\s*7441\s*448082)/g).map((part, index) =>
    /^\+44\s*7441\s*448082$/.test(part) ? (
      <a key={index} href="tel:+447441448082">
        {part}
      </a>
    ) : (
      part
    ),
  );
}
