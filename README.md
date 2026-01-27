## Bullet Journal (local + cloud)

Bullet journal web statique (HTML/CSS/JS) avec stockage local + sync cloud Supabase.

## Fonctionnalites

- Daily log, habits, projets, review, collections.
- Dashboard + insights.
- Offline-first (IndexedDB, fallback localStorage).
- Sync cloud optionnelle (compte Supabase).

## Lien en ligne

`https://gard0n.github.io/bullet/`

## Rappel: comment la sync fonctionne

Important: la sync ne marche qu'entre appareils connectes au meme compte Supabase.

- Local: les donnees vivent d'abord dans le navigateur (IndexedDB).
- Cloud: si connecte, un snapshot complet est stocke dans `user_state`.
- Premier login: choix entre "garder local" ou "charger cloud".

Bridges anti-"ca ne se met pas a jour":

- Realtime Supabase: pull auto quand le cloud change.
- Fallback poll: verification toutes les ~25s (si onglet visible).
- Focus/visible/online: re-check quand tu reviens sur la page.

Protection anti-ecrasement:

- Si le cloud est plus recent et qu'il n'y a pas de modif locale: on pull (on ne push pas).
- Si local + cloud ont change: on affiche le dialogue de conflit.

Anti-spam:

- Les "push auto" sont limites (throttle) a ~1 toutes les 12 secondes.

Debug sync:

- Menu `Compte` -> bloc debug: User / ID / Local / Sync / Cloud / Mode.

## Point cle multi-device

`localhost` et `gard0n.github.io` sont deux origines differentes:

- ils ne partagent pas localStorage/IndexedDB/session.
- pour tester la vraie sync multi-device, utilise l'URL en ligne sur les 2.

## Developpement local

Ouvrir `index.html` avec un serveur local (Live Server ou autre).

## Deploiement (GitHub Pages)

Le workflow GitHub Actions deploye automatiquement sur chaque push:
`.github/workflows/pages.yml`

## Supabase (auth + sync)

1) Activer Email provider:
   - Authentication -> Sign In / Providers -> Email.

2) URL Configuration (sinon les emails pointent vers localhost):
   - Site URL: `https://gard0n.github.io/bullet/`
   - Redirect URLs (minimum):
     - `https://gard0n.github.io/bullet/`
     - `https://gard0n.github.io/bullet/#*`
     - (optionnel dev) `http://127.0.0.1:5500/*`

3) Creer la table + RLS (SQL Editor):

```sql
create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null,
  version int not null default 1,
  updated_at timestamptz not null default now()
);

alter table public.user_state enable row level security;

create policy "Users can manage their state"
on public.user_state
for all
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
```

4) Realtime: activer la replication/realtime sur la table `user_state`.

5) Configurer les cles dans `app.js`:

```js
const SUPABASE_URL = "https://<project>.supabase.co";
const SUPABASE_ANON_KEY = "<anon_public_key>";
```

Note: l'anon key cote client est normale. Ne pas utiliser la service role key.

## FAQ

- Est-ce que ca tourne h24 sur ma machine ?
  Non. GitHub Pages sert les fichiers. Ton PC n'heberge rien.

- Mon serveur VS Code sert a quoi ?
  Uniquement a tester en local.

- Mes donnees sont-elles sauvegardees ?
  Oui en local (IndexedDB). La sync cloud est optionnelle.
