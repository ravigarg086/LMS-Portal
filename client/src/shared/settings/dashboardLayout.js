export function buildEduhiveMainClassName(compactLayout = false) {
  return ['eduhive-main', compactLayout ? 'eduhive-main--compact' : '']
    .filter(Boolean)
    .join(' ');
}
