## Bullet Journal (local + cloud)

Un bullet journal en web (statique) avec stockage local, PWA offline, et sync multi-device via Supabase.

## Fonctionnalites

- Daily log, habits, projets, review, collections.
- Dashboard + insights.
- Offline-first (IndexedDB, fallback localStorage).
- Sync cloud optionnelle (compte Supabase).

## Comment ca marche

- Le site est **statique** (HTML/CSS/JS). GitHub Pages sert les fichiers.
- Les donnees sont stockees dans le navigateur (IndexedDB).
- Si l'utilisateur se connecte, les donnees sont synchronisees dans Supabase.
- Au premier login, l'app demande si on garde le local ou si on charge le cloud.

## Lien en ligne

https://gard0n.github.io/bullet/

## Developpement local

Ouvrir `index.html` avec un serveur local (Live Server ou autre).

## Deploiement (GitHub Pages)

Le workflow GitHub Actions deploye automatiquement sur chaque push:
`.github/workflows/pages.yml`

## Supabase (auth + sync)

1) Activer Email provider:
   - Authentication -> Sign In / Providers -> Email.

2) Creer la table + RLS (SQL Editor):

```
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

3) Configurer les cles dans `app.js`:

```
const SUPABASE_URL = "https://<project>.supabase.co";
const SUPABASE_ANON_KEY = "<anon_public_key>";
```

Note: l'anon key cote client est normale. Ne pas utiliser la service role key.

## FAQ

- Est-ce que ca tourne h24 sur ma machine ?
  Non. Le site est heberge par GitHub Pages, rien ne tourne localement.

- Mon serveur VS Code sert a quoi ?
  Uniquement a tester en local. Tu peux le fermer.

- Mes donnees sont-elles sauvegardees ?
  Oui, localement (IndexedDB). La sync cloud est optionnelle.
