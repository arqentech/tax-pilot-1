import React from "react";

export interface CardRenderProps<T> {
  item: T;
  index: number;
}

interface DataCardListProps<T> {
  data: T[];
  renderCard: (props: CardRenderProps<T>) => React.ReactNode;
  emptyMessage?: string;
  emptyStateClassName?: string;
  emptyStateTextClassName?: string;
  containerClassName?: string;
  getItemKey: (item: T) => string | number;
}

export function DataCardList<T>({
  data,
  renderCard,
  emptyMessage = "No data available",
  emptyStateClassName,
  emptyStateTextClassName,
  containerClassName = "flex flex-col gap-4",
  getItemKey,
}: DataCardListProps<T>) {
  if (data.length === 0) {
    return (
      <div className={`w-full py-12 text-center ${emptyStateClassName || ""}`}>
        <p className={emptyStateTextClassName || "text-[#5F6057] text-[18px]"}>
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className={containerClassName}>
      {data.map((item, index) => (
        <React.Fragment key={getItemKey(item)}>
          {renderCard({ item, index })}
        </React.Fragment>
      ))}
    </div>
  );
}
