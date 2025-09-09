export function Customize() {
    return (
        <div className="mt-10 grid grid-cols-2 justify-center gap-8">
            <div>
                <div className="text-5xl">🌙</div>
                <h2 className="my-4 text-3xl font-semibold text-white">다크모드</h2>
                <p className="text-text-secondary text-lg">
                    눈의 피로를 줄여주는 다크 모드가 있어요.
                    <br />
                    원하는 테마를 선택하여 더 편안한 환경을 만들어 보세요.
                </p>
            </div>
            <div>
                <div className="text-5xl">🛠️</div>
                <h2 className="my-4 text-3xl font-semibold text-white">창크기 변경</h2>
                <p className="text-text-secondary text-lg">
                    사용자 환경에 맞게 창 크기를 자유롭게 조절하여 <br /> 작업 공간의 효율성을 극대화할 수 있어요.
                </p>
            </div>
            <div>
                <div className="text-5xl">🎚️</div>
                <h2 className="my-4 text-3xl font-semibold text-white">투명도 조절</h2>
                <p className="text-text-secondary text-lg">
                    창의 투명도를 조절하여 환경에 맞게 설정할 수 있어요.
                    <br /> 바탕화면과 자연스럽게 어우러지도록 설정할 수 있습니다.
                </p>
            </div>
            <div>
                <div className="text-5xl">↔️</div>
                <h2 className="my-4 text-3xl font-semibold text-white">위치 변경</h2>
                <p className="text-text-secondary text-lg">
                    화면의 어느 곳이든 원하는 위치로 창을 이동시켜,
                    <br /> 가장 편하고 효율적인 작업 동선을 만들어 보세요.
                </p>
            </div>
        </div>
    )
}
