export interface IGradesConfig {
  allowed: string[]; // Allowed grades in platform
}

const gradesConfig: IGradesConfig = {
  allowed: ['*', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'G1', 'G2', 'G3', 'G4', 'G5'],
};

export default gradesConfig;
