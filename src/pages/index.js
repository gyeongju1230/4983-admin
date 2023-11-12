import Head from "next/head";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onClickLogin = async () => {
    await axios
      .post("/api/v1/admin/login", {
        id: id,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("accessToken", res.headers.authorization);
        alert("로그인에 성공하였습니다.");
        window.location.href = "/member-info";
      })
      .catch((err) => {
        alert("아이디 또는 비밀번호가 틀렸습니다.");
        window.location.reload();
      });
  };

  return (
    <>
      <Head>
        <title>4983 어드민 페이지</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 style={{ fontSize: "3rem" }}>로그인</h1>
        <div
          style={{
            height: "65rem",
            width: "140.1rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            name={"id"}
            placeholder={"아이디를 입력해주세요"}
            value={id}
            onChange={(event) => setId(event.target.value)}
            style={{
              width: "30rem",
              height: "4rem",
              fontSize: "1.5rem",
            }}
          />

          <div style={{ margin: "1rem" }} />
          <input
            name={"password"}
            type={"password"}
            placeholder={"아이디를 입력해주세요"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            style={{
              width: "30rem",
              height: "4rem",
              fontSize: "1.5rem",
            }}
          />
          <div style={{ margin: "1rem" }} />
          <button
            style={{
              width: "30rem",
              height: "4rem",
              backgroundColor: "#02B878",
              fontSize: "2rem",
              color: "#fff",
              borderRadius: "1.2rem",
            }}
            onClick={onClickLogin}
          >
            로그인
          </button>
        </div>
      </main>
    </>
  );
}
