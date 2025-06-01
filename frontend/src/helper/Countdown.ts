// Définir le type du résultat retourné
interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// Fonction principale de calcul
function countdown(targetDate: Date): CountdownResult {
  const now = new Date().getTime(); // Heure actuelle en millisecondes
  const timeLeft = targetDate.getTime() - now;

  if (timeLeft > 0) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  } else {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
}

// Date cible
const targetDate: Date = new Date("2024-12-31T00:00:00");

// Fonction exportée
export function getCountdown(): CountdownResult {
  return countdown(targetDate);
}
