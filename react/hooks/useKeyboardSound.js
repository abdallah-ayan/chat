const sounds = [
    new Audio("/sounds/keystroke1.mp3"),
    new Audio("/sounds/keystroke2.mp3"),
    new Audio("/sounds/keystroke3.mp3"),
    new Audio("/sounds/keystroke4.mp3"),
]
export default function useKeyboardSound() {
  const index = Math.floor(Math.random() * 4);
  const audio = sounds[index == 4 ? 3 : index]
  const play = () => {
    audio.currentTime = 0;
    audio.play().catch(()=> {})
  }
  return {play}
}
