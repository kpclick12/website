import type { Metadata } from "next";

import { AnscombeTable } from "@/components/AnscombeFigure";
import { ScrollyStory } from "./ScrollyStory";
import { formatDate, posts } from "@/lib/posts";

const post = posts.find((p) => p.slug === "anscombes-quartet")!;

export const metadata: Metadata = {
  title: post.title,
  description: post.dek,
};

export default function Page() {
  return (
    <article>
      <header className="wrap article-head">
        <p className="kicker">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min
        </p>
        <h1>{post.title}</h1>
        <p className="dek">{post.dek}</p>
      </header>

      <div className="wrap prose">
        <p>
          In 1973 the statistician Francis Anscombe published four small datasets.
          Eleven pairs of numbers each — small enough to fit on a napkin. He had
          built them to make a point that the field kept forgetting, and the point
          still lands more than fifty years later.
        </p>
        <p>
          Run the standard summaries over all four and they come back the same.
          Not similar — the same. Then plot them.
        </p>
      </div>

      <ScrollyStory />

      <div className="wrap prose">
        <h2>Why this keeps happening</h2>
        <p>
          Every summary statistic is a compression, and compression discards. The
          mean throws away the distribution. The correlation coefficient throws
          away the shape. A regression line assumes you already know the
          relationship is linear, then dutifully reports the best straight line
          through whatever you hand it — including a curve, and including a cloud
          of identical points with a single outlier a long way off.
        </p>
        <p>
          None of those numbers are wrong. They answer the question they were
          asked. The trouble is that the question &ldquo;what is the mean of
          y?&rdquo; is almost never the question you actually have.
        </p>
        <p>
          Anscombe&rsquo;s own conclusion was blunter than most textbook
          treatments: make a plot, and make it first. Not as a garnish after the
          model is fitted — as the thing that tells you which model is even
          defensible.
        </p>
        <h2>The numbers</h2>
        <p>
          The full quartet, if you want to run it yourself. Dataset IV is the one
          worth staring at: ten points stacked at x = 8, and one at x = 19 doing
          all of the work.
        </p>
      </div>

      <div className="wrap">
        <AnscombeTable />
      </div>

      <div className="wrap prose">
        <p className="footnote">
          Source: F. J. Anscombe, &ldquo;Graphs in Statistical Analysis&rdquo;,{" "}
          <em>The American Statistician</em> 27 (1), 1973, pp. 17&ndash;21. Values
          reproduced as published; variance of y rounds to 4.13 and the
          correlation to 0.816 in all four sets.
        </p>
      </div>
    </article>
  );
}
