/**
 * Subjects.
 *
 * Deliberately few. A taxonomy with twenty entries is a taxonomy where every
 * filter returns one post; these are broad enough that a piece almost always has
 * an obvious home, and narrow enough to mean something.
 *
 * Each carries a hue used only as a small dot beside the label — never as the
 * label's own colour, and never as the only thing distinguishing one subject
 * from another, since the name is always right there. Hues are the validated
 * categorical steps used by the charts, so they stay distinguishable under
 * colour-vision deficiency and against both surfaces.
 */

export const TOPICS = [
  { id: "science", label: "Science" },
  { id: "climate", label: "Climate" },
  { id: "economics", label: "Economics" },
  { id: "culture", label: "Culture" },
  { id: "sport", label: "Sport" },
] as const;

export type TopicId = (typeof TOPICS)[number]["id"];

export function topicLabel(id: TopicId): string {
  return TOPICS.find((t) => t.id === id)?.label ?? id;
}
