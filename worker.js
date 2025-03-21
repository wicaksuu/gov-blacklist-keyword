const BLACKLIST_URL = "https://raw.githubusercontent.com/wicaksuu/gov-blacklist-keyword/refs/heads/main/blacklist.txt"; // Ganti dengan URL raw file Anda

export default {
  async fetch(request) {
    let response = await fetch(request);
    let text = await response.text();

    // Ambil daftar kata dari Git
    let blacklistResponse = await fetch(BLACKLIST_URL);
    let blacklistText = await blacklistResponse.text();
    let blockedWords = blacklistText.split("\n").map(word => word.trim().toLowerCase());

    // Cek apakah halaman mengandung kata terlarang
    if (blockedWords.some(word => text.toLowerCase().includes(word))) {
      return Response.redirect("https://blacklist.madiunkab.go.id", 302);
    }

    return new Response(text, response);
  }
}
