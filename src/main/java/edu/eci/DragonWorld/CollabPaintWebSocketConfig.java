package edu.eci.DragonWorld;

import org.springframework.context.annotation.Configuration;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@Configuration
@EnableWebSocketMessageBroker
public class CollabPaintWebSocketConfig extends AbstractWebSocketMessageBrokerConfigurer {
    @Value("${brokerRabbitMQ.host}")
    private String brokerRabbitMQHost;

    @Value("${brokerRabbitMQ.user}")
    private String brokerRabbitMQUser;

    @Value("${brokerRabbitMQ.password}")
    private String brokerRabbitMQPassword;

    @Value("${brokerRabbitMQ.relayPort}")
    private int relayPort;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        /*config.enableStompBrokerRelay("/topic/").setRelayHost(brokerRabbitMQHost).setRelayPort(relayPort).
                setClientLogin(brokerRabbitMQUser).
                setClientPasscode(brokerRabbitMQPassword).
                setSystemLogin(brokerRabbitMQUser).
                setSystemPasscode(brokerRabbitMQPassword).
                setVirtualHost(brokerRabbitMQUser);*/
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/stompDragon").withSockJS();

    }

}
