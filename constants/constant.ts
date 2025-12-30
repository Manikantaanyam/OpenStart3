export const PIXEL_LETTERS: Record<string, number[][]> = {
  O: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  P: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  E: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  S: [
    [0, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
  ],
  U: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  R: [
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 0],
    [1, 0, 1, 0, 0],
    [1, 0, 0, 1, 0],
  ],
  C: [
    [0, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
  ],
};

type Projects = {
  logo: string;
  url: string;
};

export const PIXEL_PROJECTS: Projects[] = [
  {
    logo: "https://github.com/cline.png",
    url: "https://github.com/cline/cline",
  },
  {
    logo: "https://github.com/novuhq.png",
    url: "https://github.com/novuhq/novu",
  },
  {
    logo: "https://github.com/gitroomhq.png",
    url: "https://github.com/gitroomhq/postiz-app",
  },
  {
    logo: "https://github.com/emcie-co.png",
    url: "https://github.com/emcie-co/parlant",
  },
  {
    logo: "https://github.com/capsoftware.png",
    url: "https://github.com/capsoftware/cap",
  },
  {
    logo: "https://github.com/formbricks.png",
    url: "https://github.com/formbricks/formbricks",
  },
  {
    logo: "https://github.com/teamhanko.png",
    url: "https://github.com/teamhanko/hanko",
  },
  {
    logo: "https://github.com/solidtime-io.png",
    url: "https://github.com/solidtime-io/solidtime",
  },
  {
    logo: "https://github.com/openpanel-dev.png",
    url: "https://github.com/openpanel-dev/openpanel",
  },
  {
    logo: "https://github.com/tolgee.png",
    url: "https://github.com/tolgee/tolgee-platform",
  },
  {
    logo: "https://github.com/pentacent.png",
    url: "https://github.com/pentacent/keila",
  },
  {
    logo: "https://github.com/trycompai.png",
    url: "https://github.com/trycompai/comp",
  },
  {
    logo: "https://github.com/getprobo.png",
    url: "https://github.com/getprobo/probo",
  },
  {
    logo: "https://github.com/vemetric.png",
    url: "https://github.com/vemetric/vemetric",
  },
  {
    logo: "https://github.com/cossistantcom.png",
    url: "https://github.com/cossistantcom/cossistant",
  },
  {
    logo: "https://github.com/theopenlane.png",
    url: "https://github.com/theopenlane/core",
  },
  {
    logo: "https://github.com/n8n-io.png",
    url: "https://github.com/n8n-io/n8n",
  },
  {
    logo: "https://github.com/langflow-ai.png",
    url: "https://github.com/langflow-ai/langflow",
  },
  {
    logo: "https://github.com/langgenius.png",
    url: "https://github.com/langgenius/dify",
  },
  {
    logo: "https://github.com/open-webui.png",
    url: "https://github.com/open-webui/open-webui",
  },
  {
    logo: "https://github.com/excalidraw.png",
    url: "https://github.com/excalidraw/excalidraw",
  },
  {
    logo: "https://github.com/rustdesk.png",
    url: "https://github.com/rustdesk/rustdesk",
  },
  {
    logo: "https://github.com/godotengine.png",
    url: "https://github.com/godotengine/godot",
  },
  {
    logo: "https://github.com/supabase.png",
    url: "https://github.com/supabase/supabase",
  },
];

export const NAV_ITEMS = [
  { name: "Dashboard", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "Issues", path: "/issues" },
  { name: "Watchlist", path: "/watchlist" },
];
