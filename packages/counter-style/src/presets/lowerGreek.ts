import CounterStyle from '../CounterStyle';

const lowerGreek = CounterStyle.alphabeticFromUnicodeRange(
  /* α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω */
  0x3b1,
  24
);

export default lowerGreek;
