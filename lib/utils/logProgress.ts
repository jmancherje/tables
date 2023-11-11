export function logProgress({
  index,
  start,
  totalCount,
}: {
  index: number;
  start: Date;
  totalCount: number;
}) {
  const completed = index + 1;
  const now = new Date();
  const durationInS = Math.round((+now - +start) / 1000);
  const averageTimePerItem = Math.round(durationInS / completed);
  const remainingItems = totalCount - completed;

  console.log(
    `${durationInS}s elapsed\n${remainingItems} items remaining.\n${
      averageTimePerItem * remainingItems
    }s remaining (estimated)\n`
  );
}
