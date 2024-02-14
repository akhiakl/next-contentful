type Direction = "asc" | "desc";
type ContentfulDirection = "" | "-";

const orderBy: Record<Direction, ContentfulDirection> = {
  asc: "",
  desc: "-",
};
const parseSortString = (
  sortStr: string,
): {
  field: string;
  direction: ContentfulDirection;
} => {
  const regex = /(?:^|\.)(\w+)\.(asc|desc)\b/i;
  const match = regex.exec(sortStr);
  if (match != null) {
    const direction = match[1] as Direction;
    return {
      field: match[0],
      direction: orderBy[direction],
    };
  }
  return {
    field: sortStr,
    direction: orderBy.asc,
  };
};

export default parseSortString;
