export async function getLoginData() {
  const response = await fetch(
    "https://login.afreecatv.com/app/LoginAction.php",
    {
      method: "POST",
      // body: "szUid=id&szPassword=password&szWork=login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  const cookieString = response.headers.get("set-cookie");
  const PdboxTicket = /PdboxTicket=(.*?);/.exec(cookieString)[1];

  return { PdboxTicket };
}

export async function getPlayerData(BJID, cookieString) {
  const playerResponse = await fetch(
    `https://live.afreecatv.com/afreeca/player_live_api.php?bjid=${BJID}`,
    {
      method: "POST",
      headers: {
        Cookie: cookieString,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `bid=${BJID}&type=live&player_type=html5`,
    }
  );

  const data = await playerResponse.json();

  const CHDOMAIN = data["CHANNEL"]["CHDOMAIN"];
  const CHATNO = data["CHANNEL"]["CHATNO"];
  const FTK = data["CHANNEL"]["FTK"];

  return { CHDOMAIN, CHATNO, FTK };
}
