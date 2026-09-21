interface PhoneFieldProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function PhoneField({ value, onChange, error, disabled = false }: PhoneFieldProps) {
  return (
    <label className="block text-xs font-bold text-dark">
      Mobile number
      <span className={`mt-1 flex min-h-10 overflow-hidden rounded-lg border bg-white transition focus-within:ring-2 ${error ? "border-red-500 focus-within:ring-red-100" : "border-border focus-within:border-secondary focus-within:ring-secondary/15"}`}>
        <span className="flex items-center border-r border-border bg-clay/55 px-2.5 text-sm font-semibold text-muted">+880</span>
        <input
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          required
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(event.target.value.replace(/\D/g, "").slice(0, 11))}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "phone-error" : undefined}
          placeholder="1XXXXXXXXX"
          className="min-w-0 flex-1 bg-transparent px-3 text-sm text-dark outline-none disabled:text-muted"
        />
      </span>
      {error && <span id="phone-error" className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
    </label>
  );
}
