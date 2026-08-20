import type {
  UnitCategoryOption,
} from "../../types/unit";

interface UnitCardProps {
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

const UnitCard = ({
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
}: UnitCardProps) => {
  const selectedCategory = categories.find(
    (item) => item.value === category
  );

  const units = selectedCategory?.units ?? [];

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">

        <div className="mb-4">
          <label className="form-label fw-semibold">
            Category
          </label>

          <select
            className="form-select"
            value={category}
            onChange={(e) =>
              onCategoryChange(e.target.value)
            }
          >
            {categories.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="row g-3 align-items-end">

          <div className="col-md-5">
            <label className="form-label fw-semibold">
              From
            </label>

            <div className="input-group">
              <input
                type="number"
                className="form-control"
                value={value}
                onChange={(e) =>
                  onValueChange(e.target.value)
                }
                placeholder="Enter value"
              />

              <select
                className="form-select"
                value={fromUnit}
                onChange={(e) =>
                  onFromUnitChange(e.target.value)
                }
              >
                {units.map((unit) => (
                  <option
                    key={unit.value}
                    value={unit.value}
                  >
                    {unit.label} ({unit.symbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-md-2 text-center">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={onSwap}
              aria-label="Swap units"
            >
              ⇄
            </button>
          </div>

          <div className="col-md-5">
            <label className="form-label fw-semibold">
              To
            </label>

            <select
              className="form-select"
              value={toUnit}
              onChange={(e) =>
                onToUnitChange(e.target.value)
              }
            >
              {units.map((unit) => (
                <option
                  key={unit.value}
                  value={unit.value}
                >
                  {unit.label} ({unit.symbol})
                </option>
              ))}
            </select>
          </div>

        </div>

        <div className="mt-4">
          <label className="form-label fw-semibold">
            Result
          </label>

          <div className="form-control bg-body-tertiary fs-4 fw-semibold">
            {result || "0"}
          </div>
        </div>

        <div className="d-flex gap-2 mt-4">

          <button
            type="button"
            className="btn btn-outline-danger flex-grow-1"
            onClick={onClear}
          >
            Clear
          </button>

        </div>

      </div>
    </div>
  );
};

export default UnitCard;