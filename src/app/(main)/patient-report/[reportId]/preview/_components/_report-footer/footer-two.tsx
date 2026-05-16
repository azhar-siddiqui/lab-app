import { ReactQRCode } from "@lglab/react-qr-code";

export function FooterTwo() {
  return (
    <div className="mt-12 px-4">
      <div className="border-t-2 border-zinc-300 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Doctor Signature */}
          <div>
            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">
              Pathologist
            </p>
            <div className="border border-dashed border-zinc-400 w-56 h-24 rounded-xl flex items-end justify-center mb-3">
              <span className="text-xs text-zinc-400 mb-2">Signature</span>
            </div>
            <p className="font-semibold">Dr. A. K. Roy, MD</p>
            <p className="text-sm text-zinc-600">Consultant Pathologist</p>
          </div>

          {/* Lab Details */}
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-blue-700/10 rounded-full flex items-center justify-center mb-3">
              <span className="text-2xl font-bold text-blue-700">M</span>
            </div>
            <p className="font-semibold text-zinc-800">
              Medicare Pathology Lab
            </p>
            <p className="text-xs text-zinc-500 mt-1">
              Kabir Nagar, Behind Central Bank Of India,
              <br />
              Phulambri, Aurangabad - 431111
            </p>
            <div className="text-xs text-emerald-600 font-medium mt-4">
              NABL Accredited • ISO 9001:2018
            </div>
          </div>

          {/* Contact & QR */}
          <div className="text-right">
            <ReactQRCode size={68} value="https://medicarelab.in" />
            <div className="mt-4 text-xs space-y-1 text-zinc-600">
              <p>+91 90117 68487</p>
              <p>medicarelab@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="text-center text-[10px] text-zinc-400 pb-2">
          Confidential Medical Report • Generated on{" "}
          {new Date().toLocaleDateString("en-IN")}
        </div>
      </div>
    </div>
  );
}
