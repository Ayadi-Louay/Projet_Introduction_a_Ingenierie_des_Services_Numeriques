package com.salemty.salemty_tn.config;

import com.salemty.salemty_tn.model.User;
import com.salemty.salemty_tn.model.HealthReport;
import com.salemty.salemty_tn.model.HealthAlert;
import com.salemty.salemty_tn.model.EmailToken;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.stereotype.Component;
import org.springframework.data.domain.Sort;

@Component
public class MongoDBIndexConfig {

    private final MongoTemplate mongoTemplate;

    public MongoDBIndexConfig(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void initIndexes() {
        // User Collection Indexes
        mongoTemplate.indexOps(User.class)
                .createIndex(new Index("email", Sort.Direction.ASC).unique());
        mongoTemplate.indexOps(User.class)
                .createIndex(new Index("createdAt", Sort.Direction.ASC));
        mongoTemplate.indexOps(User.class)
                .createIndex(new Index("governorate", Sort.Direction.ASC));

        // HealthReport Collection Indexes
        mongoTemplate.indexOps(HealthReport.class)
                .createIndex(new Index("userId", Sort.Direction.ASC));
        mongoTemplate.indexOps(HealthReport.class)
                .createIndex(new Index("status", Sort.Direction.ASC));
        mongoTemplate.indexOps(HealthReport.class)
                .createIndex(new Index("governorate", Sort.Direction.ASC));
        mongoTemplate.indexOps(HealthReport.class)
                .createIndex(new Index("createdAt", Sort.Direction.DESC));

        // HealthAlert Collection Indexes
        mongoTemplate.indexOps(HealthAlert.class)
                .createIndex(new Index("status", Sort.Direction.ASC));
        mongoTemplate.indexOps(HealthAlert.class)
                .createIndex(new Index("disease", Sort.Direction.ASC));
        mongoTemplate.indexOps(HealthAlert.class)
                .createIndex(new Index("createdAt", Sort.Direction.DESC));

        // EmailToken Collection Indexes
        mongoTemplate.indexOps(EmailToken.class)
                .createIndex(new Index("token", Sort.Direction.ASC).unique());
        mongoTemplate.indexOps(EmailToken.class)
                .createIndex(new Index("email", Sort.Direction.ASC));
        mongoTemplate.indexOps(EmailToken.class)
                .createIndex(new Index("type", Sort.Direction.ASC));
    }
}
