import Link from "next/link";
export default function Intro({
  label,
  title,
  description,
}: {
  label: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <div className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>{label}</span>
        </div>
        <span className="eyebrow light">{label.toUpperCase()}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
