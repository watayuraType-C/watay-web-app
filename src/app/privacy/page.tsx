export const metadata = {
  title: "プライバシーポリシー | watay-web-app",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-12">
      <h1 className="mb-6 text-2xl font-bold">プライバシーポリシー</h1>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">取得する情報</h2>
        <p>
          本サービスは、Googleアカウントでのログインの際に、Googleから
          次の情報を取得します。
        </p>
        <ul className="mt-2 list-disc pl-6">
          <li>氏名(表示名)</li>
          <li>メールアドレス</li>
          <li>プロフィール画像</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">利用目的</h2>
        <p>
          取得した情報は、ログインの認証と、画面上でのユーザーの表示のためにのみ
          利用します。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">情報の保管と第三者への提供</h2>
        <p>
          取得した情報は、本サービスのデータベースに保管します。法令に基づく
          場合を除き、第三者に提供しません。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">情報の削除</h2>
        <p>
          ご自身の情報の削除を希望する場合は、下記の連絡先までご連絡ください。
        </p>
      </section>

      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">連絡先</h2>
        <p>watanabe.yura.sy@gmail.com</p>
      </section>

      <p className="text-sm text-gray-500">制定日: 2026年11月22日</p>
    </main>
  );
}
