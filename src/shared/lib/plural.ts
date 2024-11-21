type PluralForms = [string, string, string];
type PluralFormsWithPlaceholder = [string, string, string];

export function plural(
  count: number,
  ...forms: PluralForms | PluralFormsWithPlaceholder
): string {
  const cases = [2, 0, 1, 1, 1, 2];
  const index = count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)];
  const formatString = forms[index];

  const declinedWord =
    typeof forms[0] === 'string' && formatString.includes('%d')
      ? formatString.replace('%d', '')
      : formatString;

  return `${formatString.includes('%d') ? count : ''} ${declinedWord}`;
}
