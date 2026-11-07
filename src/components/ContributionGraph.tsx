// GitHub 风格的贡献热力图（服务器组件）
import { getContributions } from "@/lib/github";

// 根据当天提交数占最大值的比例，分成 5 个颜色等级
function levelClass(count: number, max: number): string {
  if (count === 0 || max === 0) return "bg-white/5";
  const ratio = count / max;
  if (ratio < 0.25) return "bg-sakura/25";
  if (ratio < 0.5) return "bg-sakura/50";
  if (ratio < 0.75) return "bg-sakura/75";
  return "bg-sakura";
}

export default async function ContributionGraph() {
  const calendar = await getContributions();

  // 没配置 token 时显示提示
  if (!calendar) {
    return (
      <div className="glass rounded-2xl p-6 text-sm text-mist">
        <p className="font-semibold text-ink mb-2">📊 贡献热力图还没接通</p>
        <p>
          在项目根目录新建 <code className="text-sakura">.env.local</code>，写入{" "}
          <code className="text-sakura">GITHUB_TOKEN=你的token</code>，然后重启{" "}
          <code className="text-sakura">npm run dev</code>。
        </p>
      </div>
    );
  }

  const days = calendar.weeks.flatMap((w) => w.contributionDays);
  const max = Math.max(...days.map((d) => d.contributionCount));

  // 第一周可能不是从周日开始，前面补几个空格子，让每一行都对应同一个星期几
  const firstWeekday = days.length > 0 ? new Date(days[0].date).getUTCDay() : 0;

  return (
    <div className="glass rounded-2xl p-6">
      <p className="text-sm text-mist mb-4">
        过去一年共 <span className="text-sakura font-semibold">{calendar.totalContributions}</span>{" "}
        次贡献
      </p>
      <div className="overflow-x-auto pb-2">
        {/* grid-rows-7 + grid-flow-col：每列 7 个格子（一周），按列往右排 */}
        <div className="grid grid-rows-7 grid-flow-col gap-[3px] w-max">
          {Array.from({ length: firstWeekday }).map((_, i) => (
            <div key={`pad-${i}`} className="size-[11px]" />
          ))}
          {days.map((day) => (
            <div
              key={day.date}
              title={`${day.date}：${day.contributionCount} 次贡献`}
              className={`size-[11px] rounded-[2px] ${levelClass(day.contributionCount, max)}`}
            />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 mt-3 text-xs text-mist">
        少
        {["bg-white/5", "bg-sakura/25", "bg-sakura/50", "bg-sakura/75", "bg-sakura"].map((c) => (
          <span key={c} className={`size-[11px] rounded-[2px] ${c}`} />
        ))}
        多
      </div>
    </div>
  );
}
