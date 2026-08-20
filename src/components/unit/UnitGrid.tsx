import UnitCard from "./UnitCard";
import type { UnitCategoryOption } from "../../types/unit";

interface UnitGridProps {
  categories: UnitCategoryOption[];
  category: string;
  fromUnit: string;
  toUnit: string;
  value: string;
  result: string;

  onCategoryChange: (value: string) => void;
  onFromUnitChange: (value: string) => void;
  onToUnitChange: (value: string) => void;
  onValueChange: (value: string) => void;
  onSwap: () => void;
  onClear: () => void;
}

const UnitGrid = ({
  categories,
  category,
  fromUnit,
  toUnit,
  value,
  result,
  onCategoryChange,
  onFromUnitChange,
  onToUnitChange,
  onValueChange,
  onSwap,
  onClear,
}: UnitGridProps) => {
  return (
    <div className="row g-4">
      <div className="col-12 col-lg-10 mx-auto">
        <UnitCard
          categories={categories}
          category={category}
          fromUnit={fromUnit}
          toUnit={toUnit}
          value={value}
          result={result}
          onCategoryChange={onCategoryChange}
          onFromUnitChange={onFromUnitChange}
          onToUnitChange={onToUnitChange}
          onValueChange={onValueChange}
          onSwap={onSwap}
          onClear={onClear}
        />
      </div>
    </div>
  );
};

export default UnitGrid;