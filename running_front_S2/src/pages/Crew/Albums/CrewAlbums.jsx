/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useRef, useState } from "react";
import * as s from "./styles";
import { reqCrewAlbum } from "../../../api/Crew/crewApi";
import { useCrewStore } from "../../../stores/useCrewStroes";

const STEP = 24;

export default function CrewAlbums() {
    const { crewId } = useCrewStore();
    const [all, setAll] = useState([]);
    const [visible, setVisible] = useState(STEP);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const endRef = useRef(null);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const res = await reqCrewAlbum(crewId);
                const payload = res?.data?.body;
                setAll(Array.isArray(payload) ? payload : []);
                setAll(res.data?.body ?? []);
            } catch (e) {
                setError("앨범을 불러오지 못했습니다.");
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const showing = useMemo(() => {
        const list = Array.isArray(all) ? all : [];
        return list.slice(0, visible);
    }, [all, visible]);

    useEffect(() => {
        const len = Array.isArray(all) ? all.length : 0;
        if (!endRef.current) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisible(v => (v < len ? Math.min(v + STEP, len) : v));
                }
            },
            { rootMargin: "400px 0px" }
        );
        io.observe(endRef.current);
        return () => io.disconnect();
    }, [Array.isArray(all) ? all.length : 0]);

    console.log(showing)


    if (error) return <div>{error}</div>;
    if (loading && all.length === 0) return <div>로딩 중…</div>;

    return (
        <div css={s.wrap}>
            <div css={s.grid}>
                {showing.map((p) => (
                    <div key={p.fileName} css={s.card}>
                        <div css={s.thumbBox}>
                            <img css={s.img} src={p.url} alt={p.fileName} loading="lazy" />
                        </div>
                    </div>
                ))}
            </div>
            <div ref={endRef} css={s.sentinel} />
        </div>
    );
}
