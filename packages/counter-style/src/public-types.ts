/**
 * A function which compute the maximum codepoint length of a formatter in a
 * given range.
 *
 * @param min - The inclusive non-negative minimum.
 * @param max - The inclusive non-negative maximum.
 *
 * @public
 */
export type MaxCodepointLengthInRangeComputer = (
  min: number,
  max: number
) => number;

/**
 * A function that renders an index into its
 * {@link https://www.w3.org/TR/css-counter-styles-3/#initial-representation-for-the-counter-value | initial counter representation}.
 *
 * As specified in CSS, this function must not render negative signs, add
 * padding or prefixes and suffixes.
 *
 * @remarks It can return undefined to signal a fallback should be used
 * instead.
 *
 * @public
 */
export type InitialCounterFormatter = (index: number) => string | undefined;

/**
 * An object to specify RTL rendering.
 *
 * @public
 */
export interface RtlOptions {
  /**
   * Reverse the order of characters in the prefix.
   *
   * @example `-|` becomes `|-`
   *
   * @defaultValue true
   */
  reversePrefix?: boolean;
  /**
   * Reverse the order of characters in the suffix.
   *
   * @example `. ` becomes ` .`
   *
   * @defaultValue true
   */
  reverseSuffix?: boolean;
  /**
   * Reverse the order of characters in the counter.
   *
   * @example `abc` becomes `cba`
   *
   * @defaultValue false
   */
  reverseCounter?: boolean;
}

/**
 * An object to render counters.
 *
 * @public
 */
export interface CounterStyleRenderer {
  /**
   * Render an index into its counter representation, equivalent to CSS `counter` function.
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#generate-a-counter | CSS Counter Styles Level 3, Counter Styles}.
   *
   * @param index - The counter value to render.
   */
  renderCounter(index: number): string;
  /**
   * Get the maximum counter representation length given an index range. If a
   * fallback is defined, it will be used for values outside the range
   * boundaries of this renderer.
   *
   * @remarks This method doesn't take into account
   * {@link https://www.w3.org/TR/css-text-3/#grapheme-cluster | unicode grapheme clusters}.
   *
   * @param min - The minimum inclusive value.
   * @param max - The maximum inclusive value.
   */
  maxCounterLenInRange(min: number, max: number): number;
  /**
   * Get the maximum marker string length given an index range. If a fallback
   * is defined, it will be used for values outside the range boundaries of
   * this renderer.
   *
   * @remarks This method doesn't take into account
   * {@link https://www.w3.org/TR/css-text-3/#grapheme-cluster | unicode grapheme clusters}.
   *
   * @param min - The minimum inclusive value.
   * @param max - The maximum inclusive value.
   */
  maxMarkerLenInRange(min: number, max: number): number;
  /**
   * Render an index into its corresponding marker string.
   * See {@link https://www.w3.org/TR/css-lists-3/#text-markers | CSS Lists Level 3, Text-based Markers}.
   *
   * @param index - The counter value to render.
   */
  renderMarker(index: number): string;
  /**
   * Render this renderer's prefix.
   */
  renderPrefix(): string;
  /**
   * Render this renderer's suffix.
   */
  renderSuffix(): string;
  /**
   * Create a new renderer with a fallback used when the index is out of bounds.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#counter-style-fallback | CSS Counter Styles Level 3, Defining fallback: the fallback descriptor}.
   *
   * @param fallback - A fallback CounterStyleRenderer.
   */
  withFallback(fallback: FallbackRenderer): CounterStyleRenderer;
  /**
   * Create a new renderer with a constrained range. When the index is out of
   * bounds, the counter representation is rendered with the provided fallback,
   * or the default fallback if none was provided.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#counter-style-range | CSS Counter Styles Level 3, Limiting the counter scope: the range descriptor}.
   *
   * @param min - Minimum value (inclusive)
   * @param max - Maximum value (inclusive)
   * @param fallback - A fallback renderer to apply when the index is out of bounds.
   */
  withRange(
    min: number,
    max: number,
    fallback?: FallbackRenderer
  ): CounterStyleRenderer;
  /**
   * Create a new renderer which will render negative values by prefixing and
   * suffixing the provided characters to the renderer function.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#counter-style-negative | CSS Counter Styles Level 3, Formatting negative values: the negative descriptor}.
   *
   * @param prefix - String prepended to counter representation.
   * @param suffix - String appended to counter representation.
   */
  withNegative(prefix: string, suffix?: string): CounterStyleRenderer;
  /**
   * Create a new renderer which adds padding to the left.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#counter-style-pad | CSS Counter Styles Level 3, Zero-Padding and Constant-Width Representations: the pad descriptor}.
   *
   * @param length - The total length to which padding should be added.
   * @param pad - The character to pad.
   * @remarks If you need to pad with spaces, beware on React Native you should
   * use non-breaking spaces on iOS (\\u00A0) or the padding might get trimmed.
   */
  withPadLeft(length: number, pad: string): CounterStyleRenderer;
  /**
   * Create a new renderer which adds padding to the right.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#counter-style-pad | CSS Counter Styles Level 3, Zero-Padding and Constant-Width Representations: the pad descriptor}.
   *
   * @param length - The total length to which padding should be added.
   * @param pad - The character to pad.
   * @remarks If you need to pad with spaces, beware on React Native you should
   * use non-breaking spaces on iOS (\\u00A0) or the padding might get trimmed.
   */
  withPadRight(length: number, pad: string): CounterStyleRenderer;

  /**
   * Create a new renderer which replaces or removes this renderer suffix.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#counter-style-suffix | CSS Counter Styles Level 3, Symbols after the marker: the suffix descriptor}.
   *
   * @param suffix - A suffix, or `null` to remove the default suffix.
   */
  withSuffix(suffix: string | null): CounterStyleRenderer;

  /**
   * Create a new renderer which replaces or removes this renderer prefix.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#counter-style-prefix | CSS Counter Styles Level 3, Symbols before the marker: the prefix descriptor}.
   *
   * @param prefix - A prefix, or `null` to remove this renderer suffix.
   */
  withPrefix(prefix: string | null): CounterStyleRenderer;

  /**
   * Create a new renderer with a (hopefuly) cost-effective max codepoint
   * length computer.
   *
   * @remarks The computer function must not handle negative numbers.
   *
   * @param computer - A function to compute the max codepoints length
   * produced by the underlying formatter given a range.
   */
  withMaxLengthComputer(
    computer: (
      min: number,
      max: number,
      defaultComputer: MaxCodepointLengthInRangeComputer
    ) => number
  ): CounterStyleRenderer;

  /**
   * Create a new renderer which renders Right-to-left.
   *
   * @remarks By default:
   * - The order of prefix, counter representation and suffix will be reversed when rendering marker.
   * - The letter ordering of prefix and suffix will be reversed when rendering marker, prefix and suffix.
   * - The letter ordering of counter representation will not be reversed when rendering marker and counter.
   *
   * See {@link RtlOptions}.
   */
  withRtl(options?: RtlOptions): CounterStyleRenderer;
}

/**
 * Minimal API for a fallback.
 *
 * @public
 */
export type FallbackRenderer = Pick<
  CounterStyleRenderer,
  'renderCounter' | 'maxCounterLenInRange'
>;

/**
 * An object to build counter style renderers.
 *
 * @public
 */
export interface CounterStyleStatic {
  /**
   * Create a renderer from a formatter function.
   *
   * @remarks The formatter function should not add decorations. Especially:
   *
   * - should not add negative signs. Use {@link CounterStyleRenderer.withNegative} instead.
   * - should not add padding. Use {@link CounterStyleRenderer.withPadLeft} and {@link CounterStyleRenderer.withPadRight} instead.
   * - should not add prefixes or suffixes. Use {@link CounterStyleRenderer.withPrefix} and {@link CounterStyleRenderer.withSuffix} instead.
   *
   * If the formatter function doesn't cover the [-Infinity, Infinity] range,
   * you must specify the scope via {@link CounterStyleRenderer.withRange}.
   *
   * @param initialCounterFormatter - A formatter function which takes a non-negative integer
   * and returns its
   * {@link https://www.w3.org/TR/css-counter-styles-3/#initial-representation-for-the-counter-value | initial counter representation},
   * or undefined when there is no representation for this index. If that is
   * the case, the renderer will use the specified fallback function (see
   * {@link CounterStyleRenderer.withFallback}), or the default decimal
   * fallback if none was specified.
   *
   * @returns A style renderer.
   */
  raw: (
    initialCounterFormatter: InitialCounterFormatter
  ) => CounterStyleRenderer;

  /**
   * Create a cyclic system renderer.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#cyclic-system | CSS Counter Styles Level 3, Cycling Symbols: the cyclic system}.
   *
   * @param symbols - A suite of cyclic symbols.
   * @returns - A cyclic renderer with default range of [-Infinity, Infinity]
   */
  cyclic: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * Create a fixed system renderer.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#fixed-system | CSS Counter Styles Level 3, Exhaustible Symbols: the fixed system}.
   *
   * @param symbols - The suite of fixed symbols
   * @returns - A fixed renderer with default range of [1, symbols.length]
   */
  fixed: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * Create a symbolic system renderer.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#symbolic-system | CSS Counter Styles Level 3, Repeating Symbols: the symbolic system}.
   *
   * @param symbols - The suite of repeated symbols.
   * @returns - A symbolic renderer with default range of [1, Infinity]
   */
  symbolic: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * Create an alphabetic system renderer.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#alphabetic-system | CSS Counter Styles Level 3, Bijective Numerals: the alphabetic system}.
   *
   * @param symbols - The suite of alphabetic symbols.
   * @returns - An alphabetic renderer with default range of [1, Infinity]
   */
  alphabetic: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * Create a numeric system renderer.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#numeric-system | CSS Counter Styles Level 3, Positional Numerals: the numeric system}.
   *
   * @param symbols - The suite of numeric symbols.
   * @returns - An numeric renderer with default range of [-Infinity, Infinity]
   * and default negative symbol "-".
   */
  numeric: (...symbols: string[]) => CounterStyleRenderer;

  /**
   * Create an additive system renderer.
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#additive-system | CSS Counter Styles Level 3, Accumulating Numerals: the additive system}.
   *
   * @remarks Additive systems might have "holes" in their range coverage. For
   * example, an additive system which has no representation for "1" will not
   * translate odd indexes. **The behavior of this renderer for incomplete
   * additive systems is unspecified.**
   *
   * @param symbols - A record which indexes are non-negative numbers and values their
   * corresponding representations, each pair forming an additive tuple.
   * @returns - An additive renderer with default range of [0, Infinity] if a 0
   * additive tupple was specified, [1, Infinity] otherwise.
   */
  additive: (symbols: Record<number, string>) => CounterStyleRenderer;

  /**
   * Create a numeric system renderer from a UTF-16 code unit and a
   * base. The set of numerals for this range will be generated by incrementing
   * `originUnicode` with every integer in range [0, `base` - 1].
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#numeric-system | CSS Counter Styles Level 3, Positional Numerals: the numeric system}.
   *
   * @param originUnicode - The UTF-16 code unit number representation of index "0".
   * @param base - The number of numerals in the multiplicative system.
   */
  numericFromUnicodeRange: (
    originUnicode: number,
    base: number
  ) => CounterStyleRenderer;

  /**
   * Create an alphabetic system renderer from a  UTF-16 code unit and an alphabet
   * length. The set of symbols for this alphabetic system will be generated by
   * incrementing `originUnicode` with every integer in range [0,
   * `alphabetLength` - 1].
   *
   * See {@link https://www.w3.org/TR/css-counter-styles-3/#alphabetic-system | CSS Counter Styles Level 3, Bijective Numerals: the alphabetic system}.
   *
   * @param originUnicode - The UTF-16 code unit number representation of index "1".
   * @param alphabetLength - The number of characters in this alphabet.
   */
  alphabeticFromUnicodeRange: (
    originUnicode: number,
    alphabetLength: number
  ) => CounterStyleRenderer;
}
