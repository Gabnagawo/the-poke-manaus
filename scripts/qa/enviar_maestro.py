import subprocess
from pathlib import Path
import sys

def main():
    msg_path = Path(__file__).resolve().parent / "mensagem_maestro.txt"
    if not msg_path.exists():
        print(f"Erro: {msg_path} não encontrado.")
        sys.exit(1)
        
    msg = msg_path.read_text(encoding="utf-8")
    print(f"Enviando mensagem ({len(msg)} caracteres) para Claude Code via maestri ask...")
    
    result = subprocess.run(
        ["maestri", "ask", "Claude Code", msg],
        capture_output=True,
        text=True,
        encoding="utf-8"
    )
    
    print("STDOUT:")
    print(result.stdout)
    if result.stderr:
        print("STDERR:")
        print(result.stderr)
        
    sys.exit(result.returncode)

if __name__ == "__main__":
    main()
