export default function RulesComponent() {
  return (
    <div className="space-y-3 text-sm text-[var(--text)]">
      <p>
        Знайдзіце загаданае слова па яго <strong>сэнсе</strong>, а не па
        напісанні.
      </p>
      <p>
        Напрыклад, загадана слова:{" "}
        <strong className="text-[var(--accent)]">ЛЕС</strong>
      </p>

      <ul className="space-y-2 mt-3">
        <li className="flex items-start gap-3">
          <span
            className="shrink-0 w-3 h-3 rounded-sm mt-0.5"
            style={{ backgroundColor: "var(--rank-10)" }}
          />
          <span>
            Дрэва — <strong>вельмі блізка</strong> (№4)
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span
            className="shrink-0 w-3 h-3 rounded-sm mt-0.5"
            style={{ backgroundColor: "var(--rank-1000)" }}
          />
          <span>
            Грыб — <strong>цёпла</strong> (№215)
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span
            className="shrink-0 w-3 h-3 rounded-sm mt-0.5"
            style={{ backgroundColor: "var(--rank-default)" }}
          />
          <span>
            Аўтамабіль — <strong>халодна</strong> (№15000)
          </span>
        </li>
      </ul>

      <p className="pt-1">Чым меншы нумар, тым бліжэй вы да адгадкі.</p>
      <p>
        Слова пад нумарам <strong>1</strong> — гэта перамога!
      </p>
      <p>
        Калі захраснеце — бярыце <strong>падказку</strong>.
      </p>
      <p className="text-[var(--text-muted)]">
        Націсніце на любое слова ў спісе, каб убачыць яго ў слоўніку.
      </p>
    </div>
  );
}
