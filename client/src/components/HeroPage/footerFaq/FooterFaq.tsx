import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
}

const faqs: FAQItem[] = [
  {
    question: "99wiwi betting",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="text-sm text-white bg-[#212121] rounded-md">
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div key={index} className="py-3 px-4">
            <button
              className="flex justify-between w-full font-[500] text-[14px] lg:text-[19px] outline-0 cursor-pointer uppercase"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {openIndex === index ? <ChevronUp /> : <ChevronDown />}
            </button>
            {openIndex === index && (
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 mt-2 text-[12px] md:text-sm border-t border-black h-96 overflow-y-auto no-scrollbar">
                <div className="p-2 space-y-3.5">
                  <p className="">
                    99wiwi betting is a well-known form of entertainment for
                    millions of players worldwide. By predicting the match
                    results, you can not only enjoy the pastime but also gain
                    profit. Your success depends not only on how lucky you are
                    but also on your skills. That’s what sets betting apart from
                    games with purely random outcomes, such as roulette or
                    lotteries.
                  </p>
                  <p className="">
                    99wiwi bookmaker welcomes all enthusiasts who bet on sports,
                    as well as those who are just getting to know it. We provide
                    our bettors with a wide selection of matches in dozens of
                    sports on which you can place bets. The line presents
                    thousands of games in football, hockey, tennis, boxing, MMA,
                    volleyball, as well as other sports. Gamblers can bet on
                    pre-match and live matches. Promos and bonuses make your
                    starting journey easier; for even greater convenience you
                    can download mobile app 99wiwi to access betting through
                    your smartphone.
                  </p>
                  <h2 className="font-bold">
                    How to make your online betting experience better
                  </h2>
                  <p>
                    To place bets on sport, it only suffices to sign up, sign in
                    to your 99wiwi login account through the website or app, and
                    fund your account. To make the betting process as efficient
                    and profitable as possible, you should stick to these
                    recommendations:
                  </p>
                  <div className="">
                    <p>
                      - give preference to the sports you are familiar with and
                      that you like;
                    </p>
                    <p>
                      - look for profitable odds for predictions on non-popular
                      games;
                    </p>
                    <p>
                      - use your funds reasonably, avoid betting the entire
                      balance on an event;
                    </p>
                    <p>
                      - place live bets; this will allow you to monitor the
                      progress of the game and choose favorable outcomes at the
                      same time;
                    </p>
                    <p>
                      - participate in promos and use the 99wiwi bonus to save
                      your own funds;
                    </p>
                    <p>
                      - avoid getting overwhelmed with long accumulators
                      regardless of the high final odds, because you have a
                      really low chance to win.
                    </p>
                  </div>
                  <p>
                    And always keep in mind that there are no winnings without
                    losing. Therefore, place bets clearly realizing what you do,
                    and don’t spend amounts that exceed your budget.
                  </p>
                  <h2 className="font-bold">Types of sports betting</h2>
                  <p>
                    The official website 99wiwi has two sports betting modes:
                    pre-match and live. The first mode is about the outcomes of
                    a scheduled individual match or the results of the entire
                    tournament. The second mode is about betting on matches that
                    are currently live.
                  </p>
                  <h2 className="font-bold">Live-bets on sports</h2>
                  <p>
                    Live mode is about placing bets on matches that have already
                    started or are about to start. The odds tend to change
                    rapidly depending on the situation on the field. This way,
                    the bettors can take advantage to {'"'}seize the moment{'"'}
                    and grasp favorable odds as well as promptly react to
                    changes in the game.
                  </p>
                  <h2 className="font-bold">Pre-match-bets on sports</h2>
                  <p>
                    Bets in pre-match mode are sports bets placed on the
                    outcomes of upcoming matches or competitions. The lineup of
                    such matches is pretty extensive, so you have a chance to
                    find a good outcome with high odds before the kick-off.
                    Users can take their time to analyze the upcoming match,
                    review statistics, and accurately predict the future outcome
                    of the match.
                  </p>
                  <p>
                    We have all three main types of bets at our disposal at
                    99wiwi besides the two online betting modes: single,
                    accumulator, and system.
                  </p>
                  <h2 className="font-bold">Single bets</h2>
                  <p>
                    A single bet is a classic bet where the wager ticket
                    includes only one outcome. If the prediction turns out to be
                    true, the customer receives a reward equivalent to the
                    amount he bet multiplied by the odds of the selected event.
                    For example, if you bet $10 on an outcome with a multiplier
                    of 2.35, your winnings will be 10 * 2.35 = $23.5.
                  </p>
                  <h2 className="font-bold">Accumulator bets</h2>
                  <p>
                    Accumulator bets are a sports wager that accumulates two or
                    more outcomes not related to each other. This bet only wins
                    if all the predictions turn out to be true. The reward in
                    this case is the sum of the bet multiplied by the odds of
                    each outcome on the bet ticket. The risks of accumulator
                    bets are significantly higher than those of singles, but the
                    potential reward is also a lot higher. For instance, if you
                    choose outcomes with multipliers of 1.33, 2.21, and 2.78,
                    and you bet $10, the potential earning will be 10 1.33 2.21
                    * 2.78 = $81.71.
                  </p>
                  <h2 className="font-bold">System bets</h2>
                  <p>
                    System bets are about multiple predictions on three or more
                    outcomes in a single bet slip. It is a combination of
                    multiple accumulators based on these results. The amount the
                    gambler bets is distributed among these combinations; the
                    bet is won even if only some of the predictions turn out to
                    be true. For instance, a {'"'}2 out of 4{'"'} system brings
                    the max winning if all 4 outcomes are true. If the bettor
                    predicts only 2 or 3 outcomes, he will still receive a
                    reward, although, a smaller amount.
                  </p>
                  {/* <p className="p-2">{faq.answer}</p> */}
                </div>
                <div className="p-2 space-y-3.5">
                  <h2 className="font-bold">
                    How to profit from sports betting
                  </h2>
                  <p>
                    It’s impossible to win all the time, otherwise, the game
                    would become redundant. But what you can do is increase the
                    amount of successful predictions by demonstrating wise
                    actions, relying not only on emotions but also on cold math.
                  </p>
                  <p>
                    You should study the market and analyze the history and
                    statistics of previous matches of the selected athletes or
                    teams. Besides the bookmaker{"'"}s odds you must also take
                    into account the tournament{"'"}s position for its
                    participants; because an underdog can try their best and
                    defeat the favorite if he finds this victory game-changing
                    for him, while it may not be as crucial for the opponent.
                    Stay tuned with the latest news to be aware of the physical
                    and moral condition of the athletes before the match.
                  </p>
                  <p>
                    Stash your balance resources competently, allocating about
                    10% of the total amount on each bet. If your prediction
                    turns out to be false, you{"'"}ll still have sufficient
                    funds left to make a new bet and make up for the previous
                    loss. Keep in mind: it{"'"}s better to place more bets with
                    low odds than use a single bet with high odds.
                  </p>
                  <h2 className="font-bold">99wiwi is a top 1 bookmaker</h2>
                  <p>
                    Anyone can place bets on our platform regardless of their
                    geographical position. You can bet in dollars and euros, as
                    well as national currencies. There are dozens of deposit and
                    withdrawal methods available, including bank credit cards,
                    e-wallets, online transfers, cryptocurrencies, etc.
                  </p>
                  <p>
                    Millions of players have already opted for Melbet, which
                    makes our bookmaker one of the most popular in Eastern
                    Europe, Central Asia, and other regions around the globe.
                    10+ years of experience reinforced by positive customer
                    reviews confirms that betting at 99wiwi is easy, convenient,
                    and secure.
                  </p>
                  <h2 className="font-bold">
                    Advantages of the 99wiwi bookmaker
                  </h2>
                  <p>
                    Using the services of the 99wiwi bookmaker, the customer
                    gets significant benefits such as:
                  </p>
                  <div className="">
                    <p>
                      - 99wiwi availability almost in any part of the world;
                    </p>
                    <p>
                      - variety of supported currencies and payment methods;
                    </p>
                    <p>- fast transactions and guaranteed payouts;</p>
                    <p>- broad line of sports and a nice match listing;</p>
                    <p>- low margin and high odds on popular games;</p>
                    <p>- user-friendly app for Android and iOS;</p>
                    <p>- bonuses and promos for favorable sports betting;</p>
                    <p>- 24/7 multilingual customer support.</p>
                  </div>
                  <p>
                    Our bookmaker has been on the market since 2012. Tens of
                    millions of customers have used our services for this
                    period. Join up and feel all the advantages yourself.
                  </p>
                  <h2 className="font-bold">FAQ</h2>
                  <h2 className="font-bold">
                    What’s the right way to place online bets at Melbet?
                  </h2>
                  <p>
                    To be able to place bets at Melbet, you should first of all
                    sign up with the bookmaker and deposit your account balance.
                    After that, go to the line-up, choose the sports or
                    tournament, and find the game you want to bet on. Select the
                    desired outcome in the listing, add odds to your betting
                    ticket, include the bet amount, and confirm the bet.
                  </p>
                  <h2 className="font-bold">
                    Which sports are best for betting at Melbet?
                  </h2>
                  <p>
                    Gamblers can place bets on dozens of sports at our company,
                    including such sports as football, boxing, MMA, tennis,
                    volleyball, biathlon, hockey, esports, etc. We recommend
                    that you bet on sports you are familiar with.
                  </p>
                  <h2 className="font-bold">
                    How to sign up and log in to Melbet?
                  </h2>
                  <p>
                    99wiwi registration is available via email, phone number,
                    one-click, or through social networks. You can log in to
                    your account through the same method as you used during
                    account registration.
                  </p>
                  <h2 className="font-bold">Does 99wiwi have a mobile app?</h2>
                  <p>
                    99wiwi mobile app download can be done through our official
                    website. For Android users, they can get the app directly
                    from the download link or by scanning the QR code. iPhone
                    users can access the app using the link in the official App
                    Store catalog.
                  </p>
                  <h2 className="font-bold">
                    Does 99wiwi provide a first deposit bonus, free bets, and
                    promos?
                  </h2>
                  <p>
                    The bookmaker customers have an opportunity to get a bunch
                    of different gifts and rewards. Among them are: bonus funds,
                    free bet promo codes, increased odds, cashback, and other
                    prizes for newbies and regular gamblers.
                  </p>
                  <h2 className="font-bold">
                    How to deposit and withdraw funds at Melbet?
                  </h2>
                  <p>
                    To deposit funds, please sign in to your account, click on
                    {'"'}Deposit{'"'}, select the payment method and amount, and
                    confirm the money transfer. If you would like to withdraw
                    funds, please select {'"'}Withdraw{'"'} in the menu, specify
                    the payment method, and amount, and submit a withdrawal
                    request to the bookmaker{"'"}s financial department.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
