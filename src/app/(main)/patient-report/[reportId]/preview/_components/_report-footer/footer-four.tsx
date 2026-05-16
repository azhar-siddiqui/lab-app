import { ReactQRCode } from "@lglab/react-qr-code";

export function FooterFour() {
  return (
    <div className="bg-linear-to-r from-zinc-900 to-blue-950 text-white px-8 py-7">
      <div className="flex flex-row justify-between items-center gap-6">
        <div>
          <p className="text-sm font-medium">Medicare Pathology Lab</p>
          <p className="text-xs opacity-70 mt-1">NABL Accredited Laboratory</p>
        </div>

        <div className="flex items-center gap-8">
          <div>
            <ReactQRCode
              size={62}
              value="https://medicarelab.in"
              // background="#FFF"
              finderPatternInnerSettings={{
                color: "#FFF",
              }}
              finderPatternOuterSettings={{
                color: "#FFF",
              }}
              dataModulesSettings={{
                color: "#FFF",
              }}
            />
          </div>

          <div className="text-sm">
            <p>Dr. A. K. Roy, MD</p>
            <p className="opacity-70 text-xs">Consultant Pathologist</p>
          </div>
        </div>

        <div className="text-right text-xs opacity-70">
          <p>+91 90117 68487</p>
          <p>medicarelab@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
