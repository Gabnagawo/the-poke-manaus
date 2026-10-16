import subprocess
import sys
from pathlib import Path

# Ensure UTF-8 output on Windows
if sys.stdout.encoding.lower() != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')
if sys.stderr.encoding.lower() != 'utf-8':
    sys.stderr.reconfigure(encoding='utf-8')

def main():
    if len(sys.argv) > 1 and sys.argv[1] != "--file":
        prompt = sys.argv[1]
    else:
        file_path = Path(__file__).resolve().parent / "resposta_maestro.txt"
        if file_path.exists():
            prompt = file_path.read_text(encoding="utf-8")
        else:
            prompt = "Auditoria v4-producao concluida."
            
    print(f"Enviando resposta ao Maestro ({len(prompt)} chars)...")
    
    result = subprocess.run(
        ["maestri", "ask", "Claude Code", prompt],
        capture_output=True,
        text=True,
        encoding="utf-8"
    )
    
    print("RESPOSTA DO MAESTRO:")
    print(result.stdout)
    if result.stderr:
        print("STDERR:")
        print(result.stderr)
        
    sys.exit(result.returncode)

if __name__ == "__main__":
    main()
