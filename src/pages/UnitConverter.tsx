import { useMemo, useState } from "react";
import UnitGrid from "../components/unit/UnitGrid";
import { UNIT_CATEGORIES } from "../components/constants/units";
import { convertUnit } from "../utils/unitConverter";

const UnitConverter = () => {
  const [category, setCategory] = useState("length");
  const [value, setValue] = useState("");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");

//   const selectedCategory = useMemo(
//     () =>
//       UNIT_CATEGORIES.find(
//         (item) => item.value === category
//       ),
//     [category]
//   );

  const result = useMemo(() => {
    if (!value.trim()) {
      return "";
    }

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return "Invalid value";
    }

    const converted = convertUnit(
      numericValue,
      category as Parameters<typeof convertUnit>[1],
      fromUnit,
      toUnit
    );

    if (!Number.isFinite(converted)) {
      return "Unable to convert";
    }

    return Number(converted.toPrecision(10)).toString();
  }, [value, category, fromUnit, toUnit]);

  const handleCategoryChange = (newCategory: string) => {
    const newCategoryData = UNIT_CATEGORIES.find(
      (item) => item.value === newCategory
    );

    if (!newCategoryData) {
      return;
    }

    setCategory(newCategory);

    setFromUnit(
      newCategoryData.units[0]?.value ?? ""
    );

    setToUnit(
      newCategoryData.units[1]?.value ??
        newCategoryData.units[0]?.value ??
        ""
    );

    setValue("");
  };

  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className="container-fluid">

      <div className="mb-4">
        <h2 className="fw-bold mb-1">
          Unit Converter
        </h2>

        <p className="text-muted mb-0">
          Convert measurements between different units.
        </p>
      </div>

      <UnitGrid
        categories={UNIT_CATEGORIES}
        category={category}
        fromUnit={fromUnit}
        toUnit={toUnit}
        value={value}
        result={result}
        onCategoryChange={handleCategoryChange}
        onFromUnitChange={setFromUnit}
        onToUnitChange={setToUnit}
        onValueChange={setValue}
        onSwap={handleSwap}
        onClear={handleClear}
      />

    </div>
  );
};

export default UnitConverter;
