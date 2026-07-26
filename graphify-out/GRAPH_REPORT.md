# Graph Report - .  (2026-07-25)

## Corpus Check
- Corpus is ~11,069 words - fits in a single context window. You may not need a graph.

## Summary
- 350 nodes · 331 edges · 44 communities (39 shown, 5 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 23
- Community 24
- Community 25
- Community 30

## God Nodes (most connected - your core abstractions)
1. `scripts` - 9 edges
2. `overrides` - 7 edges
3. `tailwind` - 6 edges
4. `aliases` - 5 edges
5. `Toast` - 5 edges
6. `extends` - 4 edges
7. `axiosInstance` - 4 edges
8. `dispatch()` - 4 edges
9. `useToast()` - 4 edges
10. `emit` - 4 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- 2-file cycle: `components/ui/toast/index.ts -> components/ui/toast/use-toast.ts -> components/ui/toast/index.ts`

## Communities (44 total, 5 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (30): ToastProps, toastVariants, delegatedProps, emits, forwarded, props, delegatedProps, props (+22 more)

### Community 1 - "Community 1"
Cohesion: 0.08
Nodes (3): ListEventsParams, axiosInstance, ListUsersParams

### Community 2 - "Community 2"
Cohesion: 0.07
Nodes (29): axios, class-variance-authority, clsx, @heroicons/vue, lucide-vue-next, nuxt, dependencies, axios (+21 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (18): mapColors, mapPadding, { type = 'active', size = 'big' }, emit, isPasswordShown, inputRef, { onUpload }, emit (+10 more)

### Community 4 - "Community 4"
Cohesion: 0.08
Nodes (25): eslint, eslint-config-prettier, @eslint/eslintrc, @eslint/js, eslint-plugin-vue, globals, husky, lint-staged (+17 more)

### Community 5 - "Community 5"
Cohesion: 0.09
Nodes (21): name, unhead, @unhead/dom, @unhead/schema, @unhead/shared, @unhead/ssr, @unhead/vue, packageManager (+13 more)

### Community 6 - "Community 6"
Cohesion: 0.12
Nodes (15): aliases, components, composables, lib, utils, iconLibrary, $schema, style (+7 more)

### Community 7 - "Community 7"
Cohesion: 0.17
Nodes (9): bannedUsers, DashboardMetric, events, isLoading, metrics, pendingEvents, toneClasses, unverifiedUsers (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.17
Nodes (7): event, eventsStore, isLoading, owner, participants, route, usersStore

### Community 9 - "Community 9"
Cohesion: 0.18
Nodes (7): activeFilters, handleFilterChange(), isLoading, loadUsers(), search, { toast }, usersStore

### Community 10 - "Community 10"
Cohesion: 0.20
Nodes (9): email, emailError, handleSubmit(), isModalOpen, isSubmitting, password, passwordError, { toast } (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.24
Nodes (9): emit, filters, handleFilterChange(), Props, sortedUsers, statusSort, toggleBan(), toggleVerification() (+1 more)

### Community 12 - "Community 12"
Cohesion: 0.18
Nodes (10): Activity, Event, EventApprovalSettings, EventListItem, EventParticipant, Paginated, Sticker, User (+2 more)

### Community 14 - "Community 14"
Cohesion: 0.22
Nodes (5): isLoading, isVerifying, route, user, usersStore

### Community 15 - "Community 15"
Cohesion: 0.25
Nodes (4): eventsStore, isLoading, isVerificationEnabled, search

### Community 16 - "Community 16"
Cohesion: 0.29
Nodes (6): env, node, extends, eslint:recommended, plugin:vue/vue3-recommended, prettier

### Community 17 - "Community 17"
Cohesion: 0.40
Nodes (3): { $auth }, links, route

### Community 18 - "Community 18"
Cohesion: 0.40
Nodes (4): compat, __dirname, __filename, nuxtGlobals

### Community 19 - "Community 19"
Cohesion: 0.40
Nodes (3): { $auth }, credentials, isError

### Community 20 - "Community 20"
Cohesion: 0.50
Nodes (3): cache, cover, props

### Community 21 - "Community 21"
Cohesion: 0.50
Nodes (3): avatar, cache, props

## Knowledge Gaps
- **178 isolated node(s):** `node`, `eslint:recommended`, `plugin:vue/vue3-recommended`, `prettier`, `ListEventsParams` (+173 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Community 2` to `Community 5`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Community 4` to `Community 5`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `node`, `eslint:recommended`, `plugin:vue/vue3-recommended` to the rest of the system?**
  _178 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.06538461538461539 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07635467980295567 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Community 3` be split into smaller, more focused modules?**
  _Cohesion score 0.07389162561576355 - nodes in this community are weakly interconnected._