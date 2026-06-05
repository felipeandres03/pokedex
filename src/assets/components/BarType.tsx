import { useState } from "react";

type Props = {
  types: string[];
  handleType: (type: string) => void;
};

function BarType({ types, handleType }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <section className="container-grid">
      <div className="bar-type">
        {/* BUTTON */}

        <button className="bar-type__trigger" onClick={() => setOpen(!open)}>
          Types
          <span className={`bar-type__arrow ${open ? "active" : ""}`}>▼</span>
        </button>

        {/* DROPDOWN */}

        {open && (
          <div className="bar-type__dropdown">
            <button className="bar-type__item active">All</button>

            {types.map((type) => (
              <button
                key={type}
                className={`bar-type__item type--${type}`}
                onClick={() => {
                  handleType(type);
                  setOpen(false);
                }}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default BarType;
