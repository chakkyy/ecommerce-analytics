const ChatBase = () => {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.embeddedChatbotConfig = {
                chatbotId: "an id",
                domain: "www.thisisachatbot.placeholder"
              };
          `,
        }}
      />
      <script
        src='this is a chatbot'
        // @ts-ignore
        // eslint-disable-next-line react/no-unknown-property
        chatbotId='HMtjFakH5_kwvQNZ0PZ9W'
        // eslint-disable-next-line react/no-unknown-property
        domain='www.chatbot.placeholdertext'
        defer
      />
    </>
  );
};

export default ChatBase;
