import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Johan Hellenäs, a data analyst in Gothenburg, on why this site exists.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <header className="wrap article-head">
        <p className="kicker">About</p>
        <h1>Hi</h1>
      </header>

      <div className="wrap prose">
        <p>
          I&rsquo;m Johan Hellenäs, a data analyst in Gothenburg, Sweden.
        </p>
        <p>
          This is my hobby project — an attempt to build engaging stories out of
          data, usually by explaining something I&rsquo;ve been trying to work
          out myself.
        </p>
        <p>
          Someone once said that you have to publish work in progress if you
          want to learn anything or get useful feedback. This is me trying that.
        </p>
      </div>
    </>
  );
}
