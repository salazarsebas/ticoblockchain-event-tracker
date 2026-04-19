// Highest `.stagger-N` helper class defined in globals.css. Call sites
// clamp their computed stagger index against this so new items beyond
// the cap all land on the same final delay instead of falling off.
export const MAX_STAGGER_LEVEL = 7;
