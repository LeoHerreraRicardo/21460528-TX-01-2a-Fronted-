import Image from "next/image";
import styles from "./page.module.css";

export default function Inicio() {
  return (
    <div className={styles.contenedor}>
      <div className={styles.principal}>
        <ol>
          <li>
            Edita el archivo <code>app/page.tsx</code> para comenzar.
          </li>
          <li>Los cambios se reflejan automáticamente.</li>
        </ol>
      </div>

      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Image
            src="/next.svg"
            alt="Logotipo Next.js"
            width={140}
            height={32}
            priority
          />
        </div>

        <div className={styles.botones}>
          <a
            href="https://vercel.com/import"
            target="_blank"
            rel="noopener noreferrer"
          >
            Desplegar en Vercel
          </a>
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir a documentación
          </a>
        </div>

        <footer className={styles.pie}>
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/file.svg"
              alt="Archivo"
              width={16}
              height={16}
              aria-hidden
            />
            Tutorial básico
          </a>
          <a
            href="https://vercel.com/templates?framework=next.js"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/window.svg"
              alt="Plantillas"
              width={16}
              height={16}
              aria-hidden
            />
            Explorar plantillas
          </a>
          <a
            href="https://nextjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/globe.svg"
              alt="Sitio"
              width={16}
              height={16}
              aria-hidden
            />
            Página oficial →
          </a>
        </footer>
      </aside>
    </div>
  );
}
